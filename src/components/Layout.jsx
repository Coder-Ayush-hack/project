import React, { useState, useCallback, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import '../index.css';

// ─── sessionStorage helpers ──────────────────────────────────────────────────
// sessionStorage is scoped to the browser tab and is wiped when the tab closes.
// We use it to track per-session activity (login time, page visits, refreshes).

function ssGetNumber(key, fallback = 0) {
    const v = sessionStorage.getItem(key);
    return v !== null ? parseInt(v, 10) : fallback;
}

function ssIncrement(key) {
    const next = ssGetNumber(key) + 1;
    sessionStorage.setItem(key, String(next));
    return next;
}

function ssGetSessionStart() {
    const iso = sessionStorage.getItem('pulse_session_start');
    return iso ? new Date(iso) : new Date();
}

function Layout() {
    const [lastRefreshed, setLastRefreshed]   = useState(new Date());
    const [isConnected,   setIsConnected]     = useState(true);
    const [pageVisits,    setPageVisits]      = useState(() => ssGetNumber('pulse_page_visits'));
    const [refreshCount,  setRefreshCount]    = useState(() => ssGetNumber('pulse_refresh_count'));
    const [sessionStart]  = useState(ssGetSessionStart); // read-once

    const location = useLocation();

    // Increment page visit counter in sessionStorage whenever the route changes
    useEffect(() => {
        const updated = ssIncrement('pulse_page_visits');
        setPageVisits(updated);
    }, [location.pathname]);

    // Manual refresh: update time, simulate reconnect, track in sessionStorage
    const handleRefresh = useCallback(() => {
        const now = new Date();
        setLastRefreshed(now);
        // Persist last refresh time in sessionStorage
        sessionStorage.setItem('pulse_last_refresh', now.toISOString());

        const updated = ssIncrement('pulse_refresh_count');
        setRefreshCount(updated);

        // Simulate reconnect
        setIsConnected(false);
        setTimeout(() => setIsConnected(true), 500);
    }, []);

    return (
        <div className="dashboard-layout">
            <Sidebar />
            <main className="main-content">
                <Header
                    lastRefreshed={lastRefreshed}
                    onRefresh={handleRefresh}
                    isConnected={isConnected}
                    sessionStart={sessionStart}
                    pageVisits={pageVisits}
                    refreshCount={refreshCount}
                />
                <div className="content-area">
                    <Outlet context={{ lastRefreshed, isConnected }} />
                </div>
            </main>
        </div>
    );
}

export default Layout;
