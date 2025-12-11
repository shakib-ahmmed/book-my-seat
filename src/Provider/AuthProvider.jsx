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
import axios from "axios";

import { AuthContext } from './AuthContext'

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState(null);
    const [roleLoading, setRoleLoading] = useState(true);

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
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            setLoading(false);

            if (currentUser?.email) {
                try {
                    setRoleLoading(true);
                    const response = await axios.get(
                        `http://localhost:5000/user/role?email=${currentUser.email}`
                    );
                    setRole(response.data.role || "user");
                } catch (err) {
                    console.error("Failed to fetch role:", err);
                    setRole("user");
                } finally {
                    setRoleLoading(false);
                }
            } else {
                setRole(null);
                setRoleLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                role,
                roleLoading,
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
