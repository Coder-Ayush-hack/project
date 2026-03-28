import React, { useMemo, useCallback } from 'react';
import { useOutletContext } from 'react-router-dom';
import MetricCard from '../components/MetricCard';
import { useSimulatedData } from '../hooks/useSimulatedData';
import { useRole } from '../context/RoleContext';
import '../index.css';

function Overview() {
    const { isConnected, lastRefreshed } = useOutletContext();
    const { role } = useRole();

    const generateData = useCallback((prev) => {
        const revenue = prev ? prev.revenue + (Math.random() * 100 - 30) : 45231.89;
        const users = prev ? prev.users + Math.floor(Math.random() * 10 - 3) : 1245;
        const conversion = prev ? prev.conversion + (Math.random() * 0.4 - 0.2) : 3.2;
        return {
            revenue: Math.max(0, revenue),
            users: Math.max(0, users),
            conversion: Math.max(0, conversion),
        };
    }, []);

    const data = useSimulatedData(generateData, 3000, isConnected);

    const trends = useMemo(() => ({
        revenue: { type: 'up', value: 12.5 },
        users: { type: 'up', value: 4.1 },
        conversion: { type: 'down', value: 0.8 },
    }), []);

    const announcements = [
        { id: 1, icon: '📢', text: 'System maintenance scheduled on Apr 1, 2026 at 2:00 AM.' },
        { id: 2, icon: '🎉', text: 'Q1 revenue target reached! Great work everyone.' },
        { id: 3, icon: '🔒', text: 'Two-factor authentication is now mandatory for all admin accounts.' },
        { id: 4, icon: '📦', text: 'New API version v2.4 is now available. Check the docs.' },
    ];

    const quickStats = [
        { label: 'Total Products',    value: '1,284' },
        { label: 'Orders Today',      value: '347' },
        { label: 'Pending Invoices',  value: '12' },
        { label: 'Support Tickets',   value: '5 Open' },
        { label: 'Team Members',      value: '24' },
        { label: 'Uptime',            value: '99.98%' },
    ];

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <h1 className="page-title" style={{ margin: 0 }}>Overview</h1>
                <span className={`role-badge ${role === 'admin' ? 'role-badge-admin' : 'role-badge-user'}`}>
                    {role === 'admin' ? '🛡️ Admin View' : '👤 User View'}
                </span>
            </div>

            <div className="metrics-grid">
                <MetricCard title="Total Revenue"   value={data ? data.revenue : 0}                format="currency"   trend={trends.revenue} />
                <MetricCard title="Active Users"    value={data ? data.users : 0}                  format="number"     trend={trends.users} />
                <MetricCard title="Conversion Rate" value={data ? data.conversion.toFixed(2) : 0}  format="percentage" trend={trends.conversion} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1.5rem' }}>

                {/* Announcements */}
                <div className="basic-card">
                    <div className="basic-card-title">📢 Announcements</div>
                    <ul className="basic-list">
                        {announcements.map(a => (
                            <li key={a.id} className="basic-list-item">
                                <span className="basic-list-icon">{a.icon}</span>
                                <span>{a.text}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Quick Stats */}
                <div className="basic-card">
                    <div className="basic-card-title">📋 Quick Stats</div>
                    <div className="basic-stats-grid">
                        {quickStats.map(s => (
                            <div key={s.label} className="basic-stat-item">
                                <span className="basic-stat-label">{s.label}</span>
                                <span className="basic-stat-value">{s.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* Admin / User info panel */}
            {role === 'admin' && (
                <div className="admin-info-panel" style={{ marginTop: '1.5rem' }}>
                    <div className="admin-panel-title">🛡️ Admin Details</div>
                    <div className="admin-details-grid">
                        <div className="admin-detail-item"><span className="admin-detail-label">System Status</span><span className="admin-detail-value status-ok">● Operational</span></div>
                        <div className="admin-detail-item"><span className="admin-detail-label">DB Connections</span><span className="admin-detail-value">24 / 100</span></div>
                        <div className="admin-detail-item"><span className="admin-detail-label">Cache Hit Rate</span><span className="admin-detail-value">94.3%</span></div>
                        <div className="admin-detail-item"><span className="admin-detail-label">Active Admins</span><span className="admin-detail-value">3</span></div>
                        <div className="admin-detail-item"><span className="admin-detail-label">API Keys Active</span><span className="admin-detail-value">12</span></div>
                        <div className="admin-detail-item"><span className="admin-detail-label">Last Deploy</span><span className="admin-detail-value">Mar 26, 2026</span></div>
                    </div>
                </div>
            )}
            {role !== 'admin' && (
                <div className="user-info-panel" style={{ marginTop: '1.5rem' }}>
                    <div className="user-panel-title">👤 Your Summary</div>
                    <div className="admin-details-grid">
                        <div className="admin-detail-item"><span className="admin-detail-label">Sessions Today</span><span className="admin-detail-value">4</span></div>
                        <div className="admin-detail-item"><span className="admin-detail-label">Reports Viewed</span><span className="admin-detail-value">7</span></div>
                        <div className="admin-detail-item"><span className="admin-detail-label">Alerts Set</span><span className="admin-detail-value">2</span></div>
                        <div className="admin-detail-item"><span className="admin-detail-label">Last Login</span><span className="admin-detail-value">Today, 10:14 AM</span></div>
                        <div className="admin-detail-item"><span className="admin-detail-label">Account Status</span><span className="admin-detail-value status-ok">● Active</span></div>
                        <div className="admin-detail-item"><span className="admin-detail-label">Plan</span><span className="admin-detail-value">Pro Tier</span></div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Overview;
