import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getProposals, deleteProposal, updateProposalStatus } from '../services/proposalsService';
import './ProposalsList.css';

const ProposalsList = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const inEmbed = location.pathname.startsWith('/embed/');
    const routes = {
        new: inEmbed ? '/embed/proposals/new' : '/proposals/new',
        view: (id) => (inEmbed ? `/embed/proposals/view/${id}` : `/proposals/view/${id}`),
    };
    const [proposals, setProposals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        loadProposals();
    }, [filter]);

    const loadProposals = async () => {
        try {
            const filters = {};
            if (filter !== 'all') {
                filters.status = filter;
            }
            const data = await getProposals(filters);
            setProposals(data);
        } catch (error) {
            console.error('Error loading proposals:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Tem certeza que deseja deletar esta proposta?')) return;

        try {
            await deleteProposal(id);
            setProposals(proposals.filter(p => p.id !== id));
        } catch (error) {
            console.error('Error deleting proposal:', error);
            alert('Erro ao deletar proposta');
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            await updateProposalStatus(id, newStatus);
            setProposals(proposals.map(p =>
                p.id === id ? { ...p, status: newStatus } : p
            ));
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Erro ao atualizar status');
        }
    };

    const filteredProposals = proposals.filter(p =>
        p.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.proposal_code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('pt-BR');
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
        return <div className="loading">Carregando...</div>;
    }

    return (
        <div className="proposals-list">
            <div className="list-header">
                <h1>Propostas</h1>
                <Link to={routes.new} className="btn-new">
                    + Nova Proposta
                </Link>
            </div>

            <div className="list-filters">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Buscar por cliente ou código..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="filter-buttons">
                    <button
                        className={filter === 'all' ? 'active' : ''}
                        onClick={() => setFilter('all')}
                    >
                        Todas
                    </button>
                    <button
                        className={filter === 'aberta' ? 'active' : ''}
                        onClick={() => setFilter('aberta')}
                    >
                        Abertas
                    </button>
                    <button
                        className={filter === 'fechada' ? 'active' : ''}
                        onClick={() => setFilter('fechada')}
                    >
                        Fechadas
                    </button>
                    <button
                        className={filter === 'perdida' ? 'active' : ''}
                        onClick={() => setFilter('perdida')}
                    >
                        Perdidas
                    </button>
                </div>
            </div>

            {filteredProposals.length === 0 ? (
                <div className="empty-state">
                    <p>📄 Nenhuma proposta encontrada</p>
                    <Link to={routes.new} className="btn-create">
                        Criar nova proposta
                    </Link>
                </div>
            ) : (
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Cliente</th>
                                <th>CNPJ</th>
                                <th>Data</th>
                                <th>Status</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProposals.map((proposal) => {
                                const badge = getStatusBadge(proposal.status);
                                return (
                                    <tr
                                        key={proposal.id}
                                        onClick={() => navigate(routes.view(proposal.id))}
                                        style={{ cursor: 'pointer', transition: 'background-color 0.2s' }}
                                        className="proposal-row"
                                    >
                                        <td className="code">{proposal.proposal_code}</td>
                                        <td className="client">{proposal.client_name}</td>
                                        <td>{proposal.cnpj || '-'}</td>
                                        <td>{formatDate(proposal.created_at)}</td>
                                        <td onClick={(e) => e.stopPropagation()}>
                                            <select
                                                value={proposal.status}
                                                onChange={(e) => handleStatusChange(proposal.id, e.target.value)}
                                                className={`status-select ${badge.className}`}
                                            >
                                                <option value="aberta">Aberta</option>
                                                <option value="fechada">Fechada</option>
                                                <option value="perdida">Perdida</option>
                                            </select>
                                        </td>
                                        <td className="actions" onClick={(e) => e.stopPropagation()}>
                                            <button
                                                onClick={() => handleDelete(proposal.id)}
                                                className="btn-delete"
                                                title="Deletar"
                                            >
                                                🗑️
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ProposalsList;
