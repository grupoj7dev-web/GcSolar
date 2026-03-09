
import React, { useState, useEffect } from 'react';
import { getSettings, saveSettings } from '../services/settingsService';
import { Save } from 'lucide-react';
import './Settings.css';

const Settings = () => {
    const [settings, setSettings] = useState({
        flagGreenCost: 0.02885,
        flagYellowCost: 0.02885,
        flagRed1Cost: 0.05463,
        flagRed2Cost: 0.08648
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            const data = await getSettings();
            // Merge with defaults to ensure fields exist
            setSettings(prev => ({ ...prev, ...data }));
        } catch (error) {
            console.error('Failed to load settings');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSettings(prev => ({
            ...prev,
            [name]: parseFloat(value) || 0
        }));
    };

    const handleSave = async () => {
        setSaving(true);
        setMessage('');
        try {
            await saveSettings(settings);
            setMessage('Configurações salvas com sucesso! ✅');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            setMessage('Erro ao salvar configurações. ❌');
        } finally {
            setSaving(false);
        }
    };

    // --- Defaults for Reset ---
    const handleReset = () => {
        setSettings({
            flagGreenCost: 0.02885,
            flagYellowCost: 0.02885,
            flagRed1Cost: 0.05463,
            flagRed2Cost: 0.08648
        });
    };

    if (loading) return <div className="p-8">Carregando configurações...</div>;

    return (
        <div className="settings-page">
            <header className="page-header">
                <h1>⚙️ Configurações Globais</h1>
                <p>Defina os valores padrão para novas propostas.</p>
            </header>

            <div className="settings-card">
                <h2>Custos de Bandeira (R$/kWh)</h2>
                <p className="description">Estes valores serão preenchidos automaticamente em novas propostas.</p>

                <div className="form-grid">
                    <div className="form-group">
                        <label>Bandeira Verde</label>
                        <input
                            type="number"
                            step="0.00001"
                            name="flagGreenCost"
                            value={settings.flagGreenCost}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Bandeira Amarela</label>
                        <input
                            type="number"
                            step="0.00001"
                            name="flagYellowCost"
                            value={settings.flagYellowCost}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Bandeira Vermelha I</label>
                        <input
                            type="number"
                            step="0.00001"
                            name="flagRed1Cost"
                            value={settings.flagRed1Cost}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Bandeira Vermelha II</label>
                        <input
                            type="number"
                            step="0.00001"
                            name="flagRed2Cost"
                            value={settings.flagRed2Cost}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="actions-bar">
                    <button className="btn-reset" onClick={handleReset}>Restaurar Padrões</button>
                    <button className="btn-save" onClick={handleSave} disabled={saving}>
                        <Save size={18} />
                        {saving ? 'Salvando...' : 'Salvar Alterações'}
                    </button>
                </div>

                {message && <div className={`message-toast ${message.includes('Erro') ? 'error' : 'success'}`}>{message}</div>}
            </div>


        </div>
    );
};

export default Settings;
