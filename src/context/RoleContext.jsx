import React, { createContext, useContext, useState, useEffect } from 'react';

const RoleContext = createContext();

// ─── localStorage helpers ───────────────────────────────────────────────────
// We use localStorage so the user stays logged in across browser restarts.
const LS_KEY = 'pulse_auth'; // key stored in localStorage

function loadAuthFromStorage() {
    try {
        const raw = localStorage.getItem(LS_KEY);
        if (!raw) return { role: null, isLoggedIn: false };
        return JSON.parse(raw);
    } catch {
        return { role: null, isLoggedIn: false };
    }
}

function saveAuthToStorage(role, isLoggedIn) {
    localStorage.setItem(LS_KEY, JSON.stringify({ role, isLoggedIn }));
}

function clearAuthFromStorage() {
    localStorage.removeItem(LS_KEY);
}

// ─── Provider ────────────────────────────────────────────────────────────────
export function RoleProvider({ children }) {
    // Initialise state directly from localStorage (no flicker on page reload)
    const stored = loadAuthFromStorage();
    const [role, setRole]           = useState(stored.role);
    const [isLoggedIn, setIsLoggedIn] = useState(stored.isLoggedIn);

    // Whenever auth state changes, mirror it to localStorage
    useEffect(() => {
        if (isLoggedIn) {
            saveAuthToStorage(role, true);
        } else {
            clearAuthFromStorage();
        }
    }, [role, isLoggedIn]);

    const login = (selectedRole) => {
        setRole(selectedRole);
        setIsLoggedIn(true);
        // Also seed a fresh session entry in sessionStorage
        sessionStorage.setItem('pulse_session_start', new Date().toISOString());
        sessionStorage.setItem('pulse_page_visits', '0');
        sessionStorage.setItem('pulse_refresh_count', '0');
    };

    const logout = () => {
        setRole(null);
        setIsLoggedIn(false);
        // Wipe session data on logout
        sessionStorage.removeItem('pulse_session_start');
        sessionStorage.removeItem('pulse_page_visits');
        sessionStorage.removeItem('pulse_refresh_count');
    };

    return (
        <RoleContext.Provider value={{ role, isLoggedIn, login, logout }}>
            {children}
        </RoleContext.Provider>
    );
}

export function useRole() {
    return useContext(RoleContext);
}
