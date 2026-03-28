import React, { useMemo, useCallback } from 'react';
import { useOutletContext } from 'react-router-dom';
import MetricCard from '../components/MetricCard';
import { useSimulatedData } from '../hooks/useSimulatedData';
import '../index.css';

function UserActivity() {
    const { isConnected } = useOutletContext();

    const generateData = useCallback((prev) => ({
        pageViews: prev ? prev.pageViews + Math.floor(Math.random() * 15) : 84920,
        sessions: prev ? prev.sessions + Math.floor(Math.random() * 5) : 3402,
        bounceRate: prev ? prev.bounceRate + (Math.random() * 0.2 - 0.1) : 42.5,
    }), []);

    const data = useSimulatedData(generateData, 2500, isConnected);

    const trends = useMemo(() => ({
        pageViews: { type: 'up', value: 8.5 },
        sessions: { type: 'up', value: 5.2 },
        bounceRate: { type: 'down', value: 1.1 },
    }), []);

    const recentVisitors = [
        { name: 'Aarav Sharma', page: '/dashboard', time: '2 min ago', device: 'Desktop' },
        { name: 'Priya Kumari', page: '/pricing', time: '5 min ago', device: 'Mobile' },
        { name: 'Rohit Malhotra', page: '/products', time: '9 min ago', device: 'Tablet' },
        { name: 'Sneha Ranjan', page: '/home', time: '12 min ago', device: 'Desktop' },
        { name: 'Vikram Jaiswal', page: '/blog', time: '17 min ago', device: 'Mobile' },
        { name: 'Ananya Tiwari', page: '/docs', time: '21 min ago', device: 'Desktop' },
        { name: 'Karan Prasad', page: '/home', time: '26 min ago', device: 'Desktop' },
    ];

    const topCountries = [
        { flag: '🇺🇸', name: 'United States', sessions: 1120 },
        { flag: '🇮🇳', name: 'India', sessions: 890 },
        { flag: '🇬🇧', name: 'United Kingdom', sessions: 543 },
        { flag: '🇩🇪', name: 'Germany', sessions: 310 },
        { flag: '🇧🇷', name: 'Brazil', sessions: 275 },
        { flag: '🇯🇵', name: 'Japan', sessions: 264 },
    ];

    return (
        <div>
            <h1 className="page-title">User Activity</h1>

            <div className="metrics-grid">
                <MetricCard title="Page Views" value={data ? data.pageViews : 0} format="number" trend={trends.pageViews} />
                <MetricCard title="Active Sessions" value={data ? data.sessions : 0} format="number" trend={trends.sessions} />
                <MetricCard title="Bounce Rate" value={data ? data.bounceRate.toFixed(1) : 0} format="percentage" trend={trends.bounceRate} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1.5rem' }}>

                {/* Recent Visitors */}
                <div className="basic-card">
                    <div className="basic-card-title">👥 Recent Visitors</div>
                    <div className="basic-info-list">
                        {recentVisitors.map((v, i) => (
                            <div key={i} className="basic-info-row">
                                <div>
                                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{v.name}</div>
                                    <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.1rem' }}>
                                        {v.page} · {v.device}
                                    </div>
                                </div>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{v.time}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Countries */}
                <div className="basic-card">
                    <div className="basic-card-title">🌍 Top Countries</div>
                    <div className="basic-info-list">
                        {topCountries.map((c, i) => (
                            <div key={i} className="basic-info-row">
                                <span style={{ fontSize: '0.9rem' }}>{c.flag} {c.name}</span>
                                <span className="basic-info-value">{c.sessions.toLocaleString()} sessions</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default UserActivity;
