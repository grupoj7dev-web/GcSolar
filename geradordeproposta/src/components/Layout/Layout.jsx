import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Sidebar from './Sidebar';
import './Layout.css';

const Layout = ({ children }) => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const { user, signOut } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const isProposalView = location.pathname.includes('/proposals/view/');

    const handleLogout = async () => {
        await signOut();
        navigate('/login');
    };

    return (
        <div className="layout-container">
            <Sidebar
                isCollapsed={isSidebarCollapsed}
                setIsCollapsed={setIsSidebarCollapsed}
            />

            <div className={`layout-main ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
                {!isProposalView && (
                    <header className="layout-header">
                        <div className="header-left">
                            <button
                                className="mobile-menu-btn"
                                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                            >
                                ☰
                            </button>
                            <h2 className="page-title">Sistema de Propostas</h2>
                        </div>

                        <div className="header-right">
                            <span className="user-info">{user?.email}</span>
                            <button className="btn-logout-header" onClick={handleLogout}>
                                🚪 Sair
                            </button>
                        </div>
                    </header>
                )}

                <main className="layout-content">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
