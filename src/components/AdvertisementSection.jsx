import React, { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import {
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    updateProfile,
    signOut,
    sendPasswordResetEmail
} from "firebase/auth";

export const AuthContext = createContext();

const auth = getAuth(app); // ✅ Modular v9 syntax

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const googleProvider = new GoogleAuthProvider();

    const createUser = (email, password) =>
        createUserWithEmailAndPassword(auth, email, password);

    const signIn = (email, password) =>
        signInWithEmailAndPassword(auth, email, password);

    const googleSignIn = () => signInWithPopup(auth, googleProvider);

    const updateUser = (data) => updateProfile(auth.currentUser, data);

    const resetPassword = (email) => sendPasswordResetEmail(auth, email);

    const logOut = () => signOut(auth);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                createUser,
                signIn,
                googleSignIn,
                logOut,
                updateUser,
                resetPassword,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
