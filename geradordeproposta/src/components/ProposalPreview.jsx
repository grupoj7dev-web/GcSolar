import React from 'react';
import './ProposalPreview.css';

const ProposalPreview = ({ data }) => {
  const {
    proposalCode,
    clientName,
    cnpj,
    installationId,
    distributor,
    networkType,
    monthlyConsumption,
    currentRate,
    minCost,
    discountPercent,
    flagGreenCost = 0,
    flagYellowCost = 0,
    flagRedICost = 0,
    flagRedIICost = 0,
  } = data;

  // Calculations
  // Step 1: Determine minimum consumption based on network type and GD rule
  const { gdRule = 'GD1' } = data;
  let minConsumption = 0;

  if (gdRule === 'GD1') {
    switch (networkType) {
      case 'monofasico':
        minConsumption = 30;
        break;
      case 'bifasico':
        minConsumption = 50;
        break;
      case 'trifasico':
        minConsumption = 100;
        break;
      default:
        minConsumption = 50;
    }
  }
  // GD2 has no minimum consumption requirement

  // Step 2: Calculate compensable consumption (what J7 Solar will provide)
  // Example: 1000 kWh total - 100 kWh minimum = 900 kWh compensable
  const compensableConsumption = monthlyConsumption - minConsumption;

  // Step 3: Calculate base costs
  // Current cost without J7 = (consumption × rate) + minCost
  const currentMonthlyCost = (monthlyConsumption * currentRate) + minCost;

  // J7 Solar rate (with discount)
  const bcRate = currentRate * (1 - discountPercent / 100);

  // Cost with J7 Solar (base) = (compensable × bcRate) + minCost
  // The minCost already includes the minimum consumption charge
  const bcMonthlyCost = (compensableConsumption * bcRate) + minCost;

  // Step 4: Calculate savings for each flag
  // Logic:
  // - Client WITHOUT J7: pays (total consumption × (rate + flag cost)) + public lighting
  // - Client WITH J7: pays (compensable × bcRate) + (minimum × (rate + flag)) + public lighting
  // - Savings = difference

  // Base energy cost comparison (for percentage calculation)
  // This is the cost of the 900 kWh that J7 Solar replaces
  const baseCompensableCost = compensableConsumption * currentRate;

  // Get public lighting from data
  const { publicLighting = 0 } = data;

  // GREEN FLAG
  const costWithoutJ7Green = (monthlyConsumption * (currentRate + flagGreenCost)) + publicLighting;
  const costWithJ7Green = (compensableConsumption * bcRate) + (minConsumption * (currentRate + flagGreenCost)) + publicLighting;
  const savingsGreen = costWithoutJ7Green - costWithJ7Green;

  // YELLOW FLAG
  const costWithoutJ7Yellow = (monthlyConsumption * (currentRate + flagYellowCost)) + publicLighting;
  const costWithJ7Yellow = (compensableConsumption * bcRate) + (minConsumption * (currentRate + flagYellowCost)) + publicLighting;
  const savingsYellow = costWithoutJ7Yellow - costWithJ7Yellow;

  // RED I FLAG
  const costWithoutJ7RedI = (monthlyConsumption * (currentRate + flagRedICost)) + publicLighting;
  const costWithJ7RedI = (compensableConsumption * bcRate) + (minConsumption * (currentRate + flagRedICost)) + publicLighting;
  const savingsRedI = costWithoutJ7RedI - costWithJ7RedI;

  // RED II FLAG
  const costWithoutJ7RedII = (monthlyConsumption * (currentRate + flagRedIICost)) + publicLighting;
  const costWithJ7RedII = (compensableConsumption * bcRate) + (minConsumption * (currentRate + flagRedIICost)) + publicLighting;
  const savingsRedII = costWithoutJ7RedII - costWithJ7RedII;

  // Step 5: Calculate percentage savings
  // Percentage is calculated over the COMPENSABLE base (900 kWh worth)
  // This shows the true efficiency of the J7 Solar service
  const percentGreen = baseCompensableCost > 0 ? (savingsGreen / baseCompensableCost) * 100 : discountPercent;
  const percentYellow = baseCompensableCost > 0 ? (savingsYellow / baseCompensableCost) * 100 : discountPercent;
  const percentRedI = baseCompensableCost > 0 ? (savingsRedI / baseCompensableCost) * 100 : discountPercent;
  const percentRedII = baseCompensableCost > 0 ? (savingsRedII / baseCompensableCost) * 100 : discountPercent;

  const monthlySavings = savingsGreen; // Base savings (green flag)
  const annualSavings = monthlySavings * 12;

  // Format currency
  const formatCurrency = (val) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  const formatNumber = (val) => {
    return new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(val);
  };

  return (
    <div className="proposal-container">
      {/* Header */}
      <header className="proposal-header">
        <div className="logo-area">
          {/* Placeholder for Logo */}
          <div className="logo-placeholder">
            <span style={{ fontSize: '28px', fontWeight: 'bold', color: '#333' }}>J7</span>
            <span style={{ fontSize: '28px', fontWeight: 'bold', color: 'var(--primary-color)' }}> SOLAR</span>
            <div style={{ fontSize: '9px', letterSpacing: '1px', color: '#666' }}>ENERGY</div>
          </div>
        </div>
        <div className="company-info">
          <p><strong>J7 Solar e Engenharia Ltda</strong></p>
          <p>CNPJ: 33.333.398/0001-37</p>
          <p>Av. Antonio Fidelis, 205, Quadra 105 Lote 09</p>
          <p>Parque Amazonia - Goiânia-GO - CEP: 74.840-090</p>
        </div>
        <div className="contact-info">
          <p>📞 (62) 3140-7000</p>
          <p>🌐 j7solar.com.br</p>
          <p>📷 @j7solar</p>
        </div>
      </header>

      {/* Title */}
      <h2 className="proposal-title">Proposta Comercial J7 Solar</h2>

      {/* Client Info Box */}
      <section className="client-info-box">
        <div className="info-row">
          <div className="info-item">
            <label>Código da proposta:</label>
            <span>{proposalCode}</span>
          </div>
          <div className="info-item">
            <label>Nº da Instalação:</label>
            <span>{installationId}</span>
          </div>
        </div>
        <div className="info-row">
          <div className="info-item full-width">
            <label>Cliente:</label>
            <span>{clientName}</span>
          </div>
        </div>
        <div className="info-row">
          <div className="info-item">
            <label>CNPJ / CPF:</label>
            <span>{cnpj}</span>
          </div>
          <div className="info-item">
            <label>Distribuidora:</label>
            <span className="highlight">{distributor}</span>
          </div>
        </div>
        <div className="info-row">
          <div className="info-item">
            <label>Rede:</label>
            <span>
              {networkType === 'monofasico' && 'Monofásico'}
              {networkType === 'bifasico' && 'Bifásico'}
              {networkType === 'trifasico' && 'Trifásico'}
            </span>
          </div>
        </div>
      </section>

      {/* GD Rules Section */}


      {/* Comparison Cards */}
      <section className="comparison-cards">
        {/* Card 1: Custo sem BC */}
        <div className="card gray-card">
          <div className="card-header">
            <h3>Custo sem a<br />J7 Solar</h3>
          </div>
          <div className="card-body">
            <div className="card-row">
              <label>Consumo mensal</label>
              <div className="value-box gray">{formatNumber(monthlyConsumption)} kWh</div>
            </div>
            <div className="card-row">
              <label>Custo mínimo</label>
              <div className="value-box gray">{formatCurrency(minCost)}</div>
            </div>
            <div className="card-row">
              <label>Preço Atual R$/kWh</label>
              <div className="value-box gray">R$ {formatNumber(currentRate)}</div>
            </div>
            <div className="card-row">
              <label>Custo Médio (Mensal)</label>
              <div className="value-box gray">{formatCurrency(currentMonthlyCost)}</div>
            </div>
          </div>
        </div>

        {/* Card 2: Desconto J7 */}
        <div className="card teal-card">
          <div className="card-header">
            <h3>Desconto<br />J7 Solar</h3>
          </div>
          <div className="card-body">
            <div className="card-row">
              <label>Desconto (%)</label>
              <div className="value-box teal">{discountPercent}%</div>
            </div>
            <div className="card-row">
              <label>Custo mínimo</label>
              <div className="value-box teal">{formatCurrency(minCost)}</div>
            </div>
            <div className="card-row">
              <label>Preço J7 R$/kWh</label>
              <div className="value-box teal">R$ {formatNumber(bcRate)}</div>
            </div>
            <div className="card-row">
              <label>Custo Médio (Mensal)</label>
              <div className="value-box teal">{formatCurrency(bcMonthlyCost)}</div>
            </div>
          </div>
        </div>

        {/* Card 3: Economia */}
        <div className="card green-card">
          <div className="card-header">
            <h3>Economia mensal<br />por Bandeira</h3>
          </div>
          <div className="card-body">
            <div className="flag-row">
              <label>Bandeira Verde</label>
              <div className="flag-values">
                <div className="value-box green-bg">{formatCurrency(savingsGreen)}</div>
                <div className="percent-box green-bg">{formatNumber(percentGreen)}%</div>
              </div>
            </div>
            <div className="flag-row">
              <label>Bandeira Amarela</label>
              <div className="flag-values">
                <div className="value-box yellow-bg">{formatCurrency(savingsYellow)}</div>
                <div className="percent-box yellow-bg">{formatNumber(percentYellow)}%</div>
              </div>
            </div>
            <div className="flag-row">
              <label>Bandeira Vermelha I</label>
              <div className="flag-values">
                <div className="value-box red1-bg">{formatCurrency(savingsRedI)}</div>
                <div className="percent-box red1-bg">{formatNumber(percentRedI)}%</div>
              </div>
            </div>
            <div className="flag-row">
              <label>Bandeira Vermelha II</label>
              <div className="value-box red2-bg full-width-value">{formatCurrency(savingsRedII)} <span className="percent-badge">{formatNumber(percentRedII)}%</span></div>
            </div>
          </div>
        </div>
      </section>

      <div className="annual-savings-container">
        <h3>Economia anual sem investimento</h3>
        <div className="annual-savings-value">
          {formatCurrency(annualSavings)}
        </div>
      </div>

      {/* Tariff Flag Explanation */}
      <section className="tariff-explanation">
        <h2>O que é a Bandeira Tarifária?</h2>
        <p>Assim como um semáforo, as cores mostram o custo da energia a cada período:</p>

        <table className="tariff-table">
          <thead>
            <tr>
              <th>Cor</th>
              <th>Significado</th>
              <th>Impacto na conta</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span className="dot green"></span> Verde</td>
              <td>Condições normais de geração</td>
              <td>Nenhuma cobrança extra</td>
            </tr>
            <tr>
              <td><span className="dot yellow"></span> Amarela</td>
              <td>Geração mais cara</td>
              <td>Taxa adicional</td>
            </tr>
            <tr>
              <td><span className="dot red"></span> Vermelha</td>
              <td>Geração muito cara</td>
              <td>Custo extra mais elevado</td>
            </tr>
          </tbody>
        </table>

        <div className="tariff-note">
          <span className="bulb-icon">💡</span>
          <p>
            Com a J7 Solar, você está protegido das variações das bandeiras tarifárias.
            Mesmo quando uma bandeira tarifária está em vigor, você continua economizando.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="proposal-footer">
        {/* Footer content if any, currently empty in original but structure kept */}
      </footer>
    </div>
  );
};

export default ProposalPreview;
