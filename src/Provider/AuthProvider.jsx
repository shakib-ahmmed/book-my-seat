import React, { createContext, useEffect, useState } from 'react';


import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    updateProfile,
    signOut,
    GoogleAuthProvider,
    sendPasswordResetEmail
} from "firebase/auth";

import app from "../firebase/firebase.config";


export const AuthContext = createContext();


const auth = getAuth(app);
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoadin] = useState(true);

    const googleProvider = new GoogleAuthProvider();



    const createUser = (email, Password) => {
        setLoadin(true);
        return createUserWithEmailAndPassword(auth, email, Password);

    };

    const signIn = (email, password) => {
        setLoadin(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const googleSignIn = () => {
        setLoadin(true);
        return signInWithPopup(auth, googleProvider);
    }
    const updateUser = (updatedData) => {
        return updateProfile(auth.currentUser, updatedData);
    }

    const resetPassword = (email) => {
        setLoadin(true);
        return sendPasswordResetEmail(auth, email);
    };


    const logOut = () => {
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currenteUser) => {
            setUser(currenteUser);
            setLoadin(false);
        });
        return () => {
            unsubscribe();
        }
    }, []);

    const authData = {
        user,
        setUser,
        createUser,
        logOut,
        signIn,
        loading,
        setLoadin,
        updateUser,
        googleSignIn,
        resetPassword,
    };
    return <AuthContext.Provider value={authData} >
        {children}
    </AuthContext.Provider>

};

export default AuthProvider;