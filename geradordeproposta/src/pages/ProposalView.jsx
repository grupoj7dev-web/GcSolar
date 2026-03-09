import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getProposalById } from '../services/proposalsService';
import { Printer, Share2, ArrowLeft } from 'lucide-react';
import './ProposalView.css';

// --- Constants / Defaults ---
// Defined based on User validation (Step 373, 400+)
const DEFAULT_CIP = 1.44; // Buffer for missing Public Lighting/Tax in calculation
const DEFAULT_FLAG_GREEN = 0.02885;
const DEFAULT_FLAG_YELLOW = 0.02885;
const DEFAULT_FLAG_RED1 = 0.05463;
const DEFAULT_FLAG_RED2 = 0.086477;

const ProposalView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const inEmbed = location.pathname.startsWith('/embed/');
    const [proposal, setProposal] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProposal = async () => {
            try {
                const data = await getProposalById(id);
                setProposal(data);
            } catch (error) {
                console.error('Error loading proposal:', error);
                alert('Erro ao carregar proposta');
            } finally {
                setLoading(false);
            }
        };
        loadProposal();
    }, [id]);

    if (loading) return <div className="loading-state">Carregando proposta...</div>;
    if (!proposal) return <div className="error-state">Proposta não encontrada</div>;

    const data = proposal.proposal_data || {};

    // --- Logic Helpers ---
    const safeNum = (val, defaultVal = 0) => {
        const num = parseFloat(val);
        return isNaN(num) ? defaultVal : num;
    };

    // --- Data Extraction ---
    const {
        proposalCode,
        clientName,
        cnpj,
        installationId,
        distributor,
        networkType: rawNetworkType,
        monthlyConsumption: rawConsumption,
        currentRate: rawRate,
        minCost: rawMinCost,
        discountPercent: rawDiscount,
        publicLighting: rawPublicLighting = 0,
        flagGreenCost: rawFlagGreen,
        flagYellowCost: rawFlagYellow,
        flagRedICost: rawFlagRed1,
        flagRedIICost: rawFlagRed2,
        gdRule = 'GD1'
    } = data;

    const monthlyConsumption = safeNum(rawConsumption);
    const currentRate = safeNum(rawRate);
    const dbMinCost = safeNum(rawMinCost);
    const discountPercent = safeNum(rawDiscount);
    const publicLighting = safeNum(rawPublicLighting);

    // Apply defaults only if data is missing
    const flagGreenCost = safeNum(rawFlagGreen) || DEFAULT_FLAG_GREEN;
    const flagYellowCost = safeNum(rawFlagYellow) || DEFAULT_FLAG_YELLOW;
    const flagRed1Cost = safeNum(rawFlagRed1) || DEFAULT_FLAG_RED1;
    const flagRed2Cost = safeNum(rawFlagRed2) || DEFAULT_FLAG_RED2;

    // --- Calculations ---

    // 1. Availability Cost (Custo de Disponibilidade)
    const networkType = rawNetworkType ? rawNetworkType.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") : 'bifasico';

    let availabilityKwh = 50;
    if (gdRule === 'GD1') {
        switch (networkType) {
            case 'monofasico': availabilityKwh = 30; break;
            case 'bifasico': availabilityKwh = 50; break;
            case 'trifasico': availabilityKwh = 100; break;
            default: availabilityKwh = 50;
        }
    }
    const availabilityCost = availabilityKwh * currentRate;

    // 2. Minimum Cost Display (Calculated vs DB Protection)
    // We calculate the physical minimum cost (Availability + Lighting).
    // If 'publicLighting' is missing (0), we use DEFAULT_CIP (1.44) to ensure accuracy.
    const effectiveLighting = publicLighting > 0 ? publicLighting : DEFAULT_CIP;
    const computedMinCost = availabilityCost + effectiveLighting;

    // Safety Check: If DB has a valid higher value (e.g. includes extra taxes), use it.
    // If DB is stale/low (e.g. 24.87), use our computed corrected value (42.90).
    const minCostDisplay = Math.max(dbMinCost, computedMinCost);

    // 3. Compensable Consumption
    const compensableConsumption = Math.max(0, monthlyConsumption - availabilityKwh);

    // 4. Current Costs (Without J7)
    // Formula: (TotalConsumption * Rate) + MinCost
    const currentMonthlyCost = (monthlyConsumption * currentRate) + minCostDisplay;

    // 5. J7 Costs
    // J7 Rate is discounted from the BASE RATE.
    const bcRate = currentRate * (1 - discountPercent / 100);

    // Cost J7 = (Compensable * J7Rate) + MinCost
    const j7EnergyCost = compensableConsumption * bcRate;
    const newMonthlyCost = j7EnergyCost + minCostDisplay;

    // 6. Savings per Flag (Protected Rate Logic)
    // Savings = Cost Avoided - Cost Paid
    // Cost Avoided = Compensable * (UtilityRate + Flag)
    // Cost Paid = Compensable * J7Rate (Fixed)
    const calculateSavings = (flagCost) => {
        const utilityRateWithFlag = currentRate + flagCost;
        const savingsPerKwh = utilityRateWithFlag - bcRate;
        return compensableConsumption * savingsPerKwh;
    };

    const savingsGreen = calculateSavings(flagGreenCost);
    const savingsYellow = calculateSavings(flagYellowCost);
    const savingsRed1 = calculateSavings(flagRed1Cost);
    const savingsRed2 = calculateSavings(flagRed2Cost);

    const annualSavings = savingsGreen * 12;

    // 7. Percentages
    // Percentage = Savings / Base Cost of Compensable Energy
    // Matches the 23.48% reference (7.83 / 33.35).
    const getPercent = (savings) => {
        const base = compensableConsumption * currentRate;
        if (base <= 0) return 0;
        return (savings / base) * 100;
    };

    // --- Formatting ---
    const fmtMoney = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const fmtPerc = (v) => v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '%';
    const fmtNum = (v) => v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    const handleShare = () => {
        // Trigger print dialog for PDF generation
        window.print();

        // After a short delay, open WhatsApp with message
        setTimeout(() => {
            const message = `Ola! Segue em anexo a Proposta Comercial J7 Solar\n\n` +
                `Cliente: ${clientName}\n` +
                `Economia Anual: ${fmtMoney(annualSavings)}\n` +
                `Desconto: ${fmtNum(discountPercent)}%\n\n` +
                `Atenciosamente,\nEquipe J7 Solar`;

            const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        }, 1000);
    };


    return (
        <div className="proposal-view-container">
            <div className="screen-actions no-print">
                <button onClick={() => navigate(inEmbed ? '/embed/proposals' : '/proposals')} className="btn-action">
                    <ArrowLeft size={18} /> Voltar
                </button>
                <button onClick={handleShare} className="btn-action success">
                    <Share2 size={18} /> Compartilhar
                </button>
                <button onClick={() => window.open(`/print-proposal/${id}`, '_blank')} className="btn-action primary">
                    <Printer size={18} /> Imprimir / PDF
                </button>
            </div>

            <div className="proposal-card">
                <header className="proposal-header">
                    <div className="header-company-info">
                        <h2>GRUPO J7 - GESTORA E COMERCIALIZADORA DE ENERGIA</h2>
                        <p>CNPJ: 33.333.398/0001-37</p>
                        <p>Av. Antonio Fidelis, 205, Goiânia-GO</p>
                    </div>
                    <div className="header-logo-area">
                        <div className="logo-text">ENERGIA LIVRE</div>
                    </div>
                </header>

                <div className="proposal-body">
                    <div className="proposal-title-section">
                        <h1>Proposta Comercial</h1>
                        <p className="proposal-subtitle">Energia Inteligente para seu Negócio</p>
                    </div>

                    <div className="client-grid">
                        <div className="info-group"><label>Cliente</label><div className="value">{clientName}</div></div>
                        <div className="info-group"><label>CNPJ / CPF</label><div className="value">{cnpj || '-'}</div></div>
                        <div className="info-group"><label>Código</label><div className="value">{proposalCode}</div></div>
                        <div className="info-group"><label>Instalação</label><div className="value">{installationId}</div></div>
                    </div>

                    {/* COMPARISON TABLE */}
                    <div className="comparison-container">

                        {/* Column 1: Gray */}
                        <div className="comp-column gray-col">
                            <div className="col-header">
                                CUSTO SEM A<br />J7 SOLAR
                            </div>
                            <div className="col-body">
                                <div className="data-box">
                                    <label>CONSUMO MENSAL</label>
                                    <div className="value-pill gray">{fmtNum(monthlyConsumption)} kWh</div>
                                </div>
                                <div className="data-box">
                                    <label>CUSTO MÍNIMO</label>
                                    <div className="value-pill gray">{fmtMoney(minCostDisplay)}</div>
                                </div>
                                <div className="data-box">
                                    <label>PREÇO ATUAL R$/KWH</label>
                                    <div className="value-pill gray">R$ {fmtNum(currentRate)}</div>
                                </div>
                                <div className="data-box">
                                    <label>CUSTO MÉDIO (MENSAL)</label>
                                    <div className="value-pill gray">{fmtMoney(currentMonthlyCost)}</div>
                                </div>
                            </div>
                        </div>

                        {/* Column 2: Teal */}
                        <div className="comp-column teal-col">
                            <div className="col-header">
                                DESCONTO<br />J7 SOLAR
                            </div>
                            <div className="col-body">
                                <div className="data-box">
                                    <label>DESCONTO (%)</label>
                                    <div className="value-pill teal">{fmtNum(discountPercent)}%</div>
                                </div>
                                <div className="data-box">
                                    <label>CUSTO MÍNIMO</label>
                                    <div className="value-pill teal">{fmtMoney(minCostDisplay)}</div>
                                </div>
                                <div className="data-box">
                                    <label>PREÇO J7 R$/KWH</label>
                                    <div className="value-pill teal">R$ {fmtNum(bcRate)}</div>
                                </div>
                                <div className="data-box">
                                    <label>CUSTO MÉDIO (MENSAL)</label>
                                    <div className="value-pill teal">{fmtMoney(newMonthlyCost)}</div>
                                </div>
                            </div>
                        </div>

                        {/* Column 3: Savings (Green Header) */}
                        <div className="comp-column green-col">
                            <div className="col-header">
                                ECONOMIA MENSAL<br />POR BANDEIRA
                            </div>
                            <div className="col-body">
                                <div className="data-box">
                                    <label>BANDEIRA VERDE</label>
                                    <div className="value-pill light">
                                        <span className="txt-green">{fmtMoney(savingsGreen)}</span>
                                        <span className="txt-green-light">{fmtPerc(getPercent(savingsGreen))}</span>
                                    </div>
                                </div>
                                <div className="data-box">
                                    <label>BANDEIRA AMARELA</label>
                                    <div className="value-pill light">
                                        <span className="txt-orange">{fmtMoney(savingsYellow)}</span>
                                        <span className="txt-orange-light">{fmtPerc(getPercent(savingsYellow))}</span>
                                    </div>
                                </div>
                                <div className="data-box">
                                    <label>BANDEIRA VERMELHA I</label>
                                    <div className="value-pill light">
                                        <span className="txt-red">{fmtMoney(savingsRed1)}</span>
                                        <span className="txt-red-light">{fmtPerc(getPercent(savingsRed1))}</span>
                                    </div>
                                </div>
                                <div className="data-box">
                                    <label>BANDEIRA VERMELHA II</label>
                                    <div className="value-pill light">
                                        <span className="txt-darkred">{fmtMoney(savingsRed2)}</span>
                                        <span className="txt-darkred-light">{fmtPerc(getPercent(savingsRed2))}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="total-savings-banner">
                        <span className="label">ECONOMIA ANUAL SEM INVESTIMENTO</span>
                        <span className="value">{fmtMoney(annualSavings)}</span>
                    </div>

                    {/* Footer Info */}
                    <div className="tariff-explanation">
                        <h3>Entenda as Bandeiras</h3>
                        <p>A cor da bandeira indica se a energia está mais cara ou mais barata. Com a J7, você economiza sempre.</p>
                        <div className="flags-legend">
                            <div className="flag-item"><div className="dot green"></div> Verde: Sem acréscimo</div>
                            <div className="flag-item"><div className="dot yellow"></div> Amarela: Mora caro (+ custo)</div>
                            <div className="flag-item"><div className="dot red"></div> Vermelha: Muito caro (++ custo)</div>
                        </div>
                    </div>

                </div>
                <footer className="proposal-footer">
                    Gerado por GPro J7
                </footer>
            </div>
        </div>
    );
};

export default ProposalView;
