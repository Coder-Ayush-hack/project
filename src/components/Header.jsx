import React, { useState, useEffect } from 'react';
import { useRole } from '../context/RoleContext';
import '../index.css';

// Format elapsed time as "Xh Ym" or "Xm Ys"
function formatDuration(startDate) {
    const secs = Math.floor((Date.now() - startDate.getTime()) / 1000);
    if (secs < 60)  return `${secs}s`;
    const mins = Math.floor(secs / 60);
    if (mins < 60)  return `${mins}m ${secs % 60}s`;
    const hrs  = Math.floor(mins / 60);
    return `${hrs}h ${mins % 60}m`;
}

function Header({ lastRefreshed, onRefresh, isConnected, sessionStart, pageVisits, refreshCount }) {
    const { role, logout } = useRole();

    // Tick every second so the elapsed timer updates live
    const [, setTick] = useState(0);
    useEffect(() => {
        const id = setInterval(() => setTick(t => t + 1), 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <header className="header">
            {/* ── Left side ── */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>Real-Time Simulator</span>
                <span className={`role-badge ${role === 'admin' ? 'role-badge-admin' : 'role-badge-user'}`}>
                    {role === 'admin' ? '🛡️ Admin' : '👤 User'}
                </span>
            </div>

            {/* ── Right side ── */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>

                {/* Session stats (from sessionStorage) */}
                <div className="session-stats">
                    <span className="session-stat" title="Time elapsed since login this session">
                        ⏱ <strong>{formatDuration(sessionStart)}</strong>
                    </span>
                    <span className="session-stat-divider">|</span>
                    <span className="session-stat" title="Pages visited this session (sessionStorage)">
                        🗂 <strong>{pageVisits}</strong> pages
                    </span>
                    <span className="session-stat-divider">|</span>
                    <span className="session-stat" title="Manual refreshes this session (sessionStorage)">
                        🔄 <strong>{refreshCount}</strong> refreshes
                    </span>
                </div>

                {/* Live connection status */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                    <span style={{
                        display: 'inline-block',
                        width: '8px',
                        height: '8px',
                        borderRadius: '51%',
                        backgroundColor: isConnected ? 'var(--success-color)' : 'var(--danger-color)'
                    }} />
                    {isConnected ? 'Live' : 'Offline'}
                </div>

                <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    {lastRefreshed.toLocaleTimeString()}
                </span>

                <button onClick={onRefresh} id="btn-refresh" aria-label="Manual Refresh">
                    🔄 Refresh
                </button>

                <button
                    id="btn-logout"
                    className="logout-btn"
                    onClick={logout}
                    aria-label="Logout"
                    title="Sign out — clears session data"
                >
                    🚪 Logout
                </button>
            </div>
        </header>
    );
}

export default Header;
