import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        const savedAuth = localStorage.getItem('auth');
        return savedAuth ? JSON.parse(savedAuth) : null;
    });

    const login = (userData) => {
        // Expected structure:
        // userData = {
        //     user: {...userDetails},
        //     token: "your-token-here"
        // }
        setAuth(userData);
        localStorage.setItem('auth', JSON.stringify(userData));
    };

    const logout = () => {
        setAuth(null);
        localStorage.removeItem('auth');
    };

    // Debug auth changes
    useEffect(() => {
        console.log('Auth state changed:', auth);
    }, [auth]);

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
