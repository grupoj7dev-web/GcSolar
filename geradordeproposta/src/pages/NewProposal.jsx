import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createProposal } from '../services/proposalsService';
import { getSettings } from '../services/settingsService';
import ProposalForm from '../components/ProposalForm';
import ProposalPreview from '../components/ProposalPreview';
import './NewProposal.css';

const NewProposal = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const inEmbed = location.pathname.startsWith('/embed/');
    const [proposalData, setProposalData] = useState({
        proposalCode: '',
        clientName: '',
        cnpj: '',
        installationId: '',
        distributor: 'Equatorial',
        networkType: 'bifasico',
        monthlyConsumption: 0,
        currentRate: 0,
        minCost: 0,
        publicLighting: 0,
        discountPercent: 20,
        flagExemption: false,
        flagGreenCost: 0,
        flagYellowCost: 0.02885,
        flagRedICost: 0.05463,
        flagRedIICost: 0.086477,
        gdRule: 'GD1',
        generationMode: 'compartilhado',
        generatorName: '',
        returnFioB: true,
        returnPisCofins: true,
        pisCofinsPct: 0,
        returnIcms: true,
        icmsPct: 0,
    });
    const [saving, setSaving] = useState(false);

    // Auto-generate proposal code if not present
    React.useEffect(() => {
        if (!proposalData.proposalCode) {
            Promise.all([
                fetch('/api/proposal-code').then(res => res.json()),
                getSettings()
            ])
                .then(([codeData, settingsData]) => {
                    setProposalData(prev => ({
                        ...prev,
                        proposalCode: codeData.proposalCode,
                        // Apply global settings if available
                        flagGreenCost: settingsData.flagGreenCost ?? prev.flagGreenCost,
                        flagYellowCost: settingsData.flagYellowCost ?? prev.flagYellowCost,
                        flagRedICost: settingsData.flagRed1Cost ?? prev.flagRedICost,
                        flagRedIICost: settingsData.flagRed2Cost ?? prev.flagRedIICost,
                    }));
                })
                .catch((err) => {
                    console.error("Error init:", err);
                    const fallbackCode = `PROP-${Date.now()}`;
                    setProposalData(prev => ({ ...prev, proposalCode: fallbackCode }));
                });
        }
    }, [proposalData.proposalCode]);

    const handleSave = async () => {
        if (!proposalData.clientName) {
            alert('Por favor, preencha o nome do cliente');
            return;
        }

        setSaving(true);
        try {
            const result = await createProposal(proposalData);
            alert('Proposta criada com sucesso!');
            navigate(inEmbed ? `/embed/proposals/view/${result.id}` : `/proposals/view/${result.id}`);
        } catch (error) {
            console.error('Error saving proposal:', error);
            alert('Erro ao salvar proposta: ' + error.message);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="new-proposal">
            <div className="new-proposal-header">
                <h1>Nova Proposta</h1>
            </div>

            <div className="new-proposal-content" style={{ justifyContent: 'center' }}>
                <div className="form-panel" style={{ width: '100%', maxWidth: '100%', margin: '0' }}>
                    <ProposalForm
                        data={proposalData}
                        onChange={setProposalData}
                        onSubmit={handleSave}
                        loading={saving}
                    />
                </div>
            </div>
        </div>
    );
};

export default NewProposal;
