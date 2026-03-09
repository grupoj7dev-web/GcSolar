import React from 'react';
import PDFUploader from './PDFUploader';

const ProposalForm = ({ data, onChange, onSubmit, loading }) => {
    const handleChange = (e) => {
        const { name, value, type } = e.target;
        const newValue = type === 'number' ? parseFloat(value) : value;

        const updatedData = {
            ...data,
            [name]: newValue,
        };

        // Auto-calculate Min Cost if relevant fields change
        if (name === 'networkType' || name === 'currentRate' || name === 'gdRule') {
            const netType = (name === 'networkType' ? newValue : data.networkType) || 'monofasico';
            const rate = (name === 'currentRate' ? newValue : data.currentRate) || 0;
            const rule = (name === 'gdRule' ? newValue : data.gdRule) || 'GD1';

            let availKwh = 30; // Default Mono
            const normType = netType.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

            if (rule === 'GD1') {
                if (normType.includes('bifasico')) availKwh = 50;
                else if (normType.includes('trifasico')) availKwh = 100;
            }

            // Calculate and update minCost automatically
            // Round to 2 decimals
            updatedData.minCost = parseFloat((availKwh * rate).toFixed(2));
        }

        onChange(updatedData);
    };

    const handlePDFDataExtracted = (extractedData) => {
        onChange({
            ...data,
            ...extractedData,
        });
    };

    return (
        <div className="form-container">
            <PDFUploader onDataExtracted={handlePDFDataExtracted} />

            <h3 className="mb-4" style={{ marginTop: '20px' }}>⚡ Regras de Gestora de Crédito (GD)</h3>


            <div className="form-group">
                <label><strong>Regra GD</strong></label>
                <div style={{ display: 'flex', gap: '20px', marginTop: '8px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                        <input
                            type="radio"
                            name="gdRule"
                            value="GD1"
                            checked={data.gdRule === 'GD1'}
                            onChange={handleChange}
                            style={{ width: 'auto', cursor: 'pointer' }}
                        />
                        GD1
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                        <input
                            type="radio"
                            name="gdRule"
                            value="GD2"
                            checked={data.gdRule === 'GD2'}
                            onChange={handleChange}
                            style={{ width: 'auto', cursor: 'pointer' }}
                        />
                        GD2
                    </label>
                </div>
            </div>

            <div className="form-group">
                <label>Modalidade de Geração</label>
                <select name="generationMode" value={data.generationMode} onChange={handleChange} style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px' }}>
                    <option value="remoto">Remoto (Mesma Titularidade)</option>
                    <option value="compartilhado">Compartilhado (Titularidade Diferente)</option>
                </select>
            </div>

            <div className="form-group">
                <label>Nome da Geradora (Opcional)</label>
                <input type="text" name="generatorName" value={data.generatorName} onChange={handleChange} placeholder="Digite o nome da geradora" autoComplete="off" />
            </div>

            {/* Devolver Fio B - apenas GD2 */}
            {data.gdRule === 'GD2' && (
                <div className="form-group conditional-field">
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                        <input
                            type="checkbox"
                            name="returnFioB"
                            checked={data.returnFioB || false}
                            onChange={(e) => onChange({ ...data, returnFioB: e.target.checked })}
                            style={{ width: 'auto', cursor: 'pointer' }}
                        />
                        <strong>Devolver Fio B?</strong>
                        <span style={{ fontSize: '12px', color: '#666', marginLeft: '4px' }}>(apenas GD2)</span>
                    </label>
                </div>
            )}

            {/* Devolver PIS/COFINS - apenas Compartilhado */}
            {data.generationMode === 'compartilhado' && (
                <>
                    <div className="form-group conditional-field">
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                name="returnPisCofins"
                                checked={data.returnPisCofins || false}
                                onChange={(e) => onChange({ ...data, returnPisCofins: e.target.checked })}
                                style={{ width: 'auto', cursor: 'pointer' }}
                            />
                            <strong>Devolver PIS/COFINS?</strong>
                            <span style={{ fontSize: '12px', color: '#666', marginLeft: '4px' }}>(apenas Compartilhado)</span>
                        </label>
                    </div>
                    {data.returnPisCofins && (
                        <div className="form-group" style={{ marginLeft: '24px' }}>
                            <label>Porcentagem PIS/COFINS (%)</label>
                            <input
                                type="number"
                                name="pisCofinsPct"
                                step="0.01"
                                value={data.pisCofinsPct || 0}
                                onChange={handleChange}
                                placeholder="Ex: 9.25"
                                autoComplete="off"
                            />
                        </div>
                    )}
                </>
            )}

            {/* Devolver ICMS - apenas Compartilhado */}
            {data.generationMode === 'compartilhado' && (
                <>
                    <div className="form-group conditional-field">
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                name="returnIcms"
                                checked={data.returnIcms || false}
                                onChange={(e) => onChange({ ...data, returnIcms: e.target.checked })}
                                style={{ width: 'auto', cursor: 'pointer' }}
                            />
                            <strong>Devolver ICMS?</strong>
                            <span style={{ fontSize: '12px', color: '#666', marginLeft: '4px' }}>(apenas Compartilhado)</span>
                        </label>
                    </div>
                    {data.returnIcms && (
                        <div className="form-group" style={{ marginLeft: '24px' }}>
                            <label>Porcentagem ICMS (%)</label>
                            <input
                                type="number"
                                name="icmsPct"
                                step="0.01"
                                value={data.icmsPct || 0}
                                onChange={handleChange}
                                placeholder="Ex: 17.00"
                                autoComplete="off"
                            />
                        </div>
                    )}
                </>
            )}

            <h2 className="mb-4">Dados da Proposta</h2>

            {data.proposalCode && (
                <div className="form-group" style={{ backgroundColor: '#f0f9f8', padding: '10px', borderRadius: '4px', marginBottom: '15px' }}>
                    <label style={{ fontSize: '12px', color: '#666' }}>Código da Proposta (gerado automaticamente)</label>
                    <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--primary-color)' }}>{data.proposalCode}</div>
                </div>
            )}

            <div className="form-group">
                <label>Cliente</label>
                <input type="text" name="clientName" value={data.clientName} onChange={handleChange} autoComplete="off" />
            </div>

            <div className="form-group">
                <label>CNPJ / CPF</label>
                <input type="text" name="cnpj" value={data.cnpj} onChange={handleChange} autoComplete="off" />
            </div>

            <div className="form-group">
                <label>Nº da Instalação (UC)</label>
                <input type="text" name="installationId" value={data.installationId} onChange={handleChange} autoComplete="off" />
            </div>

            <div className="form-group">
                <label>Distribuidora</label>
                <input type="text" name="distributor" value={data.distributor} onChange={handleChange} autoComplete="off" />
            </div>

            <div className="form-group">
                <label>Rede</label>
                <select name="networkType" value={data.networkType} onChange={handleChange} autoComplete="off" style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px' }}>
                    <option value="monofasico">Monofásico</option>
                    <option value="bifasico">Bifásico</option>
                    <option value="trifasico">Trifásico</option>
                </select>
            </div>

            <h3 className="mb-4" style={{ marginTop: '20px' }}>Dados de Consumo</h3>

            <div className="form-group">
                <label>Consumo Mensal (kWh)</label>
                <input type="number" name="monthlyConsumption" value={data.monthlyConsumption} onChange={handleChange} autoComplete="off" />
            </div>

            <div className="form-group">
                <label>Preço Atual (R$/kWh)</label>
                <input type="number" name="currentRate" step="0.01" value={data.currentRate} onChange={handleChange} autoComplete="off" />
            </div>

            <div className="form-group">
                <label>Iluminação Pública (R$)</label>
                <input type="number" name="publicLighting" step="0.01" value={data.publicLighting} onChange={handleChange} autoComplete="off" />
            </div>

            <div className="form-group">
                <label>
                    Custo Mínimo (R$)
                    <span style={{ fontSize: '11px', color: '#666', marginLeft: '8px' }}>
                        (calculado automaticamente)
                    </span>
                </label>
                <input
                    type="number"
                    name="minCost"
                    step="0.01"
                    value={data.minCost}
                    onChange={handleChange}
                    style={{ backgroundColor: '#f0f0f0' }}
                    autoComplete="off"
                />
            </div>

            <div className="form-group">
                <label>Desconto J7 (%)</label>
                <input type="number" name="discountPercent" value={data.discountPercent} onChange={handleChange} autoComplete="off" />
            </div>

            <h3 className="mb-4" style={{ marginTop: '20px' }}>Custos Adicionais por Bandeira (R$/kWh)</h3>



            <div className="form-group">
                <label>Bandeira Verde (adicional)</label>
                <input
                    type="number"
                    name="flagGreenCost"
                    step="0.001"
                    value={data.flagGreenCost || 0}
                    onChange={handleChange}
                    disabled={data.flagExemption}
                    style={{ opacity: data.flagExemption ? 0.5 : 1 }}
                    autoComplete="off"
                />
            </div>

            <div className="form-group">
                <label>Bandeira Amarela (adicional)</label>
                <input
                    type="number"
                    name="flagYellowCost"
                    step="0.001"
                    value={data.flagYellowCost || 0}
                    onChange={handleChange}
                    disabled={data.flagExemption}
                    style={{ opacity: data.flagExemption ? 0.5 : 1 }}
                    autoComplete="off"
                />
            </div>

            <div className="form-group">
                <label>Bandeira Vermelha I (adicional)</label>
                <input
                    type="number"
                    name="flagRedICost"
                    step="0.001"
                    value={data.flagRedICost || 0}
                    onChange={handleChange}
                    disabled={data.flagExemption}
                    style={{ opacity: data.flagExemption ? 0.5 : 1 }}
                    autoComplete="off"
                />
            </div>

            <div className="form-group">
                <label>Bandeira Vermelha II (adicional)</label>
                <input
                    type="number"
                    name="flagRedIICost"
                    step="0.001"
                    value={data.flagRedIICost || 0}
                    onChange={handleChange}
                    disabled={data.flagExemption}
                    style={{ opacity: data.flagExemption ? 0.5 : 1 }}
                    autoComplete="off"
                />
            </div>



            <div className="form-actions" style={{ marginTop: '30px', display: 'flex', justifyContent: 'flex-end' }}>
                <button
                    className="btn-save"
                    onClick={onSubmit}
                    disabled={loading}
                    style={{
                        backgroundColor: '#FF6B00',
                        color: 'white',
                        padding: '12px 24px',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}
                >
                    {loading ? 'Gerando...' : 'Gerar Proposta'}
                </button>
            </div>
        </div>
    );
};

export default ProposalForm;
