import React, { useState, useEffect } from 'react';
import './AdminSettings.css';

const AdminSettings = ({ onClose }) => {
    const [fioBCost, setFioBCost] = useState(0);
    const [flagGreenCost, setFlagGreenCost] = useState(0);
    const [flagYellowCost, setFlagYellowCost] = useState(0);
    const [flagRedICost, setFlagRedICost] = useState(0);
    const [flagRedIICost, setFlagRedIICost] = useState(0);

    useEffect(() => {
        // Carregar configurações do servidor
        fetch('/api/settings')
            .then(res => res.json())
            .then(settings => {
                setFioBCost(settings.fioBCost || 0);
                setFlagGreenCost(settings.flagGreenCost || 0);
                setFlagYellowCost(settings.flagYellowCost || 0);
                setFlagRedICost(settings.flagRedICost || 0);
                setFlagRedIICost(settings.flagRedIICost || 0);
            })
            .catch(err => console.error('Erro ao carregar configurações:', err));
    }, []);

    const handleSave = () => {
        const settings = {
            fioBCost: parseFloat(fioBCost) || 0,
            flagGreenCost: parseFloat(flagGreenCost) || 0,
            flagYellowCost: parseFloat(flagYellowCost) || 0,
            flagRedICost: parseFloat(flagRedICost) || 0,
            flagRedIICost: parseFloat(flagRedIICost) || 0,
        };

        fetch('/api/settings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(settings),
        })
            .then(res => res.json())
            .then(() => {
                alert('Configurações salvas com sucesso!');
                if (onClose) onClose();
            })
            .catch(err => {
                console.error('Erro ao salvar configurações:', err);
                alert('Erro ao salvar configurações.');
            });
    };

    return (
        <div className="admin-modal-overlay">
            <div className="admin-modal">
                <div className="admin-header">
                    <h2>⚙️ Configurações Administrativas</h2>
                    <button className="close-btn" onClick={onClose}>✕</button>
                </div>

                <div className="admin-content">
                    <div className="form-group">
                        <label>
                            <strong>Custo do Fio B (R$/kWh)</strong>
                            <span className="help-text">
                                Valor usado quando "Devolver Fio B" está ativado (apenas GD2)
                            </span>
                        </label>
                        <input
                            type="number"
                            step="0.001"
                            value={fioBCost}
                            onChange={(e) => setFioBCost(e.target.value)}
                            placeholder="0.000"
                        />
                    </div>

                    <div className="form-group">
                        <label><strong>Bandeira Verde (R$/kWh)</strong></label>
                        <input
                            type="number"
                            step="0.001"
                            value={flagGreenCost}
                            onChange={(e) => setFlagGreenCost(e.target.value)}
                            placeholder="0.000"
                        />
                    </div>

                    <div className="form-group">
                        <label><strong>Bandeira Amarela (R$/kWh)</strong></label>
                        <input
                            type="number"
                            step="0.001"
                            value={flagYellowCost}
                            onChange={(e) => setFlagYellowCost(e.target.value)}
                            placeholder="0.000"
                        />
                    </div>

                    <div className="form-group">
                        <label><strong>Bandeira Vermelha I (R$/kWh)</strong></label>
                        <input
                            type="number"
                            step="0.001"
                            value={flagRedICost}
                            onChange={(e) => setFlagRedICost(e.target.value)}
                            placeholder="0.000"
                        />
                    </div>

                    <div className="form-group">
                        <label><strong>Bandeira Vermelha II (R$/kWh)</strong></label>
                        <input
                            type="number"
                            step="0.001"
                            value={flagRedIICost}
                            onChange={(e) => setFlagRedIICost(e.target.value)}
                            placeholder="0.000"
                        />
                    </div>
                </div>

                <div className="admin-footer">
                    <button className="btn btn-secondary" onClick={onClose}>
                        Cancelar
                    </button>
                    <button className="btn btn-primary" onClick={handleSave}>
                        💾 Salvar Configurações
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;
