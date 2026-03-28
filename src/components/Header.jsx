import React from 'react';
import { useRole } from '../context/RoleContext';
import '../index.css';

function Header({ lastRefreshed, onRefresh, isConnected }) {
    const { role, logout } = useRole();

    return (
        <header className="header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>Real-Time Simulator</span>
                <span className={`role-badge ${role === 'admin' ? 'role-badge-admin' : 'role-badge-user'}`}>
                    {role === 'admin' ? '🛡️ Admin' : '👤 User'}
                </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {/* Live status */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                    <span style={{
                        display: 'inline-block',
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: isConnected ? 'var(--success-color)' : 'var(--danger-color)'
                    }}></span>
                    {isConnected ? 'Live Connected' : 'Disconnected'}
                </div>

                <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    Last Refreshed: {lastRefreshed.toLocaleTimeString()}
                </span>

                <button onClick={onRefresh} id="btn-refresh" aria-label="Manual Refresh">
                    🔄 Refresh
                </button>

                {/* Logout Button */}
                <button
                    id="btn-logout"
                    className="logout-btn"
                    onClick={logout}
                    aria-label="Logout"
                    title="Sign out and return to login"
                >
                    🚪 Logout
                </button>
            </div>
        </header>
    );
}

export default Header;
