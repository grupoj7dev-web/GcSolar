import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, Settings as SettingsIcon } from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
    const menuItems = [
        { path: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
        { path: '/proposals', icon: <FileText size={20} />, label: 'Propostas' },
        { path: '/settings', icon: <SettingsIcon size={20} />, label: 'Configurações' },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {!isCollapsed && (
                <div
                    className="sidebar-overlay"
                    onClick={() => setIsCollapsed(true)}
                />
            )}

            {/* Sidebar */}
            <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
                {/* Header */}
                <div className="sidebar-header">
                    <h1 className="sidebar-logo">
                        {isCollapsed ? 'G' : 'Gpro J7'}
                    </h1>
                    <button
                        className="sidebar-toggle"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        title={isCollapsed ? 'Expandir' : 'Recolher'}
                    >
                        {isCollapsed ? '→' : '←'}
                    </button>
                </div>

                {/* Menu */}
                <nav className="sidebar-menu">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `sidebar-menu-item ${isActive ? 'active' : ''}`
                            }
                            title={isCollapsed ? item.label : ''}
                        >
                            <span className="menu-icon">{item.icon}</span>
                            {!isCollapsed && <span className="menu-label">{item.label}</span>}
                        </NavLink>
                    ))}
                </nav>
            </div>
        </>
    );
};

export default Sidebar;
