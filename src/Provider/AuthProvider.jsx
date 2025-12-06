import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const saved = localStorage.getItem("bookMySeatUser");
        if (saved) setUser(JSON.parse(saved));
        setLoading(false);
    }, []);

    useEffect(() => {
        if (user) localStorage.setItem("bookMySeatUser", JSON.stringify(user));
        else localStorage.removeItem("bookMySeatUser");
    }, [user]);

    const logIn = (userData) => {
        return new Promise((resolve) => {
            setUser(userData);
            resolve(userData);
        });
    };

    const logOut = () => {
        return new Promise((resolve) => {
            setUser(null);
            resolve();
        });
    };

    return (
        <AuthContext.Provider value={{ user, loading, logIn, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};
