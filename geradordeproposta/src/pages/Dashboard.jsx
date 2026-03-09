import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProposals, getStatistics } from '../services/proposalsService';
import './Dashboard.css';

const Dashboard = () => {
    const [stats, setStats] = useState({
        total: 0,
        fechadas: 0,
        perdidas: 0,
        abertas: 0,
    });
    const [recentProposals, setRecentProposals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [statsData, proposalsData] = await Promise.all([
                getStatistics(),
                getProposals({ limit: 10 }),
            ]);
            setStats(statsData);
            setRecentProposals(proposalsData);
        } catch (error) {
            console.error('Error loading dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    const getStatusBadge = (status) => {
        const badges = {
            aberta: { label: 'Aberta', className: 'status-aberta' },
            fechada: { label: 'Fechada', className: 'status-fechada' },
            perdida: { label: 'Perdida', className: 'status-perdida' },
        };
        return badges[status] || badges.aberta;
    };

    if (loading) {
        return (
            <div className="dashboard-loading">
                <div className="loading-spinner"></div>
                <p>Carregando dashboard...</p>
            </div>
        );
    }

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <div>
                    <h1>Dashboard</h1>
                    <p className="dashboard-subtitle">Visão geral do sistema</p>
                </div>
                <Link to="/proposals/new" className="btn-new-proposal">
                    <span className="btn-icon">+</span>
                    Nova Proposta
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-header">
                        <div className="stat-icon-wrapper stat-icon-orange">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 11l3 3L22 4"></path>
                                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"></path>
                            </svg>
                        </div>
                        <span className="stat-label">Total de Propostas</span>
                    </div>
                    <div className="stat-value">{stats.total}</div>
                    <div className="stat-footer">Todas as propostas</div>
                </div>

                <div className="stat-card">
                    <div className="stat-header">
                        <div className="stat-icon-wrapper stat-icon-green">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        </div>
                        <span className="stat-label">Propostas Fechadas</span>
                    </div>
                    <div className="stat-value">{stats.fechadas}</div>
                    <div className="stat-footer">Negócios concluídos</div>
                </div>

                <div className="stat-card">
                    <div className="stat-header">
                        <div className="stat-icon-wrapper stat-icon-red">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="15" y1="9" x2="9" y2="15"></line>
                                <line x1="9" y1="9" x2="15" y2="15"></line>
                            </svg>
                        </div>
                        <span className="stat-label">Não Fechadas</span>
                    </div>
                    <div className="stat-value">{stats.perdidas + stats.abertas}</div>
                    <div className="stat-footer">Abertas e perdidas</div>
                </div>
            </div>

            {/* Recent Proposals */}
            <div className="recent-proposals">
                <div className="section-header">
                    <h2>Propostas Recentes</h2>
                    <Link to="/proposals" className="btn-view-all">
                        Ver todas
                    </Link>
                </div>

                {recentProposals.length === 0 ? (
                    <div className="empty-state">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M9 11l3 3L22 4"></path>
                            <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"></path>
                        </svg>
                        <p>Nenhuma proposta criada ainda</p>
                        <Link to="/proposals/new" className="btn-create-first">
                            Criar primeira proposta
                        </Link>
                    </div>
                ) : (
                    <div className="proposals-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Cliente</th>
                                    <th>Data</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentProposals.map((proposal) => {
                                    const badge = getStatusBadge(proposal.status);
                                    return (
                                        <tr key={proposal.id}>
                                            <td className="proposal-code">{proposal.proposal_code}</td>
                                            <td className="client-name">{proposal.client_name}</td>
                                            <td className="proposal-date">{formatDate(proposal.created_at)}</td>
                                            <td>
                                                <span className={`status-badge ${badge.className}`}>
                                                    {badge.label}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
