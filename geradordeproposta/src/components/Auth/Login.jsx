import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Auth.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { signIn, user } = useAuth();

    React.useEffect(() => {
        if (user) {
            navigate('/dashboard', { replace: true });
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const { error } = await signIn(email, password);

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            navigate('/');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-background">
                <div className="auth-gradient"></div>
            </div>

            <div className="auth-card">
                <div className="auth-header">
                    <h1 className="brand-title">Gpro J7</h1>
                    <p className="brand-subtitle">Sistema de Geração de Propostas</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    <h2 className="form-title">Entrar</h2>

                    <div style={{ marginBottom: '20px', padding: '12px', background: '#e3f2fd', borderRadius: '8px', fontSize: '13px', color: '#1976d2', borderLeft: '4px solid #1976d2' }}>
                        👋 Se este é seu primeiro acesso, <strong>cadastre-se</strong> usando o link abaixo.
                    </div>

                    {error && (
                        <div className="error-message">
                            <span>⚠️</span> {error}
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="email">E-mail</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="seu@email.com"
                            required
                            autoComplete="email"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Senha</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            autoComplete="current-password"
                        />
                    </div>

                    <div className="form-options">
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <span>Lembrar-me</span>
                        </label>
                        <a href="#" className="forgot-password">Esqueceu a senha?</a>
                    </div>

                    <button
                        type="submit"
                        className="btn-primary"
                        disabled={loading}
                        style={{
                            background: 'linear-gradient(135deg, #FF6B00 0%, #FF8534 100%)',
                            color: '#fff'
                        }}
                    >
                        {loading ? 'Entrando...' : 'Entrar'}
                    </button>

                    <p className="auth-footer">
                        Não tem uma conta? <Link to="/register">Cadastre-se</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
