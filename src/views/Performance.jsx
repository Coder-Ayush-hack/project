import React, { useMemo, useCallback } from 'react';
import { useOutletContext } from 'react-router-dom';
import MetricCard from '../components/MetricCard';
import { useSimulatedData } from '../hooks/useSimulatedData';
import '../index.css';

function Performance() {
    const { isConnected } = useOutletContext();

    const generateData = useCallback(() => ({
        load:    Math.floor(Math.random() * 100),
        latency: Math.floor(Math.random() * 150 + 20),
        errors:  Math.floor(Math.random() * 5),
    }), []);

    const data = useSimulatedData(generateData, 1000, isConnected);

    const trends = useMemo(() => {
        if (!data) return {};
        return {
            load:    { type: data.load    > 80 ? 'up' : 'neutral', value: 2.1 },
            latency: { type: data.latency > 100 ? 'up' : 'down',   value: 5.4 },
            errors:  { type: data.errors  > 2   ? 'up' : 'down',   value: 1.2 },
        };
    }, [data]);

    const systemInfo = [
        { label: 'Operating System', value: 'Ubuntu 22.04 LTS' },
        { label: 'Node.js Version',  value: 'v20.11.0' },
        { label: 'Server Region',    value: 'Asia South (Mumbai)' },
        { label: 'Total Memory',     value: '16 GB RAM' },
        { label: 'CPU Cores',        value: '8 vCPUs' },
        { label: 'Disk Space',       value: '512 GB SSD (38% used)' },
        { label: 'IP Address',       value: '10.0.0.42 (private)' },
        { label: 'Last Reboot',      value: 'Mar 20, 2026 — 3:00 AM' },
    ];

    const alerts = [
        { level: 'ok',   icon: '✅', text: 'All core services running normally.' },
        { level: 'warn', icon: '⚠️', text: 'Disk usage above 35% — monitor closely.' },
        { level: 'ok',   icon: '✅', text: 'SSL certificates valid for 89 more days.' },
        { level: 'ok',   icon: '✅', text: 'Backup completed successfully at 2:00 AM.' },
    ];

    const alertColor = { ok: 'var(--success-color)', warn: 'var(--warning-color)', err: 'var(--danger-color)' };

    return (
        <div>
            <h1 className="page-title">System Performance</h1>

            <div className="metrics-grid">
                <MetricCard title="Server Load"  value={data ? data.load    : 0} format="percentage" trend={trends.load} />
                <MetricCard title="Avg Latency"  value={data ? data.latency : 0} format="ms"         trend={trends.latency} />
                <MetricCard title="Error Rate"   value={data ? data.errors  : 0} format="number"     trend={trends.errors} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1.5rem' }}>

                {/* System Info */}
                <div className="basic-card">
                    <div className="basic-card-title">🖥️ System Info</div>
                    <div className="basic-info-list">
                        {systemInfo.map(item => (
                            <div key={item.label} className="basic-info-row">
                                <span className="basic-info-label">{item.label}</span>
                                <span className="basic-info-value">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Status Alerts */}
                <div className="basic-card">
                    <div className="basic-card-title">🔔 Status Alerts</div>
                    <ul className="basic-list">
                        {alerts.map((a, i) => (
                            <li key={i} className="basic-list-item" style={{ color: alertColor[a.level] }}>
                                <span className="basic-list-icon">{a.icon}</span>
                                <span style={{ color: 'var(--text-primary)' }}>{a.text}</span>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </div>
    );
}

export default Performance;
