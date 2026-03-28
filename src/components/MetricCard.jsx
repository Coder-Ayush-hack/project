import React, { useEffect, useState } from 'react';
import '../index.css';

const MetricCard = React.memo(({ title, value, format = 'number', trend = null }) => {
    const [flash, setFlash] = useState(false);

    // Flash the card background on value change to simulate "real-time" update
    useEffect(() => {
        setFlash(true);
        const timeout = setTimeout(() => setFlash(false), 500);
        return () => clearTimeout(timeout);
    }, [value]);

    const formattingOptions = {
        currency: (v) => `$${v.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        number: (v) => v.toLocaleString(),
        percentage: (v) => `${v}%`,
        ms: (v) => `${v} ms`
    };

    const formattedValue = formattingOptions[format] ? formattingOptions[format](value) : value;

    return (
        <div className={`metric-card ${flash ? 'updated' : ''}`}>
            <div className="metric-title">{title}</div>
            <div className="metric-value">{formattedValue}</div>
            {trend && (
                <div className={`metric-trend ${trend.type === 'up' ? 'trend-up' : trend.type === 'down' ? 'trend-down' : 'trend-neutral'}`}>
                    {trend.type === 'up' ? '▲' : trend.type === 'down' ? '▼' : '▬'} {Math.abs(trend.value)}% since last hour
                </div>
            )}
        </div>
    );
});

export default MetricCard;
