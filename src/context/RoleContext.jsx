import React, { createContext, useContext, useState } from 'react';

const RoleContext = createContext();

export function RoleProvider({ children }) {
    const [role, setRole] = useState(null);       // null | 'user' | 'admin'
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = (selectedRole) => {
        setRole(selectedRole);
        setIsLoggedIn(true);
    };

    const logout = () => {
        setRole(null);
        setIsLoggedIn(false);
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
