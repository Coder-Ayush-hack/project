import React, { useState, useCallback, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import '../index.css';

function Layout() {
    const [lastRefreshed, setLastRefreshed] = useState(new Date());
    const [isConnected, setIsConnected] = useState(true);

    // Expose a top level refresh manual trigger
    const handleRefresh = useCallback(() => {
        setLastRefreshed(new Date());
        // Simulate re-connecting
        setIsConnected(false);
        setTimeout(() => {
            setIsConnected(true);
        }, 500);
    }, []);

    return (
        <div className="dashboard-layout">
            <Sidebar />
            <main className="main-content">
                <Header
                    lastRefreshed={lastRefreshed}
                    onRefresh={handleRefresh}
                    isConnected={isConnected}
                />
                <div className="content-area">
                    {/* We pass lastRefreshed to Outlet context so children can re-fetch or reset if needed */}
                    <Outlet context={{ lastRefreshed, isConnected }} />
                </div>
            </main>
        </div>
    );
}

export default Layout;
