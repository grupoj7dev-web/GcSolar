import React, { createContext, useContext, useState, useEffect } from 'react';
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut as firebaseSignOut,
    updateProfile
} from 'firebase/auth';
import { auth } from '../lib/firebaseClient';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                // Bypass authentication with a mock user
                setUser({
                    uid: 'bypass-user',
                    email: 'admin@gpro.com',
                    displayName: 'Admin'
                });
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    // Sign Up
    const signUp = async (email, password, metadata = {}) => {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            if (metadata.name) {
                await updateProfile(result.user, { displayName: metadata.name });
            }
            return { result, error: null };
        } catch (error) {
            return { result: null, error };
        }
    };

    // Sign In
    const signIn = async (email, password) => {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            return { result, error: null };
        } catch (error) {
            return { result: null, error };
        }
    };

    // Sign Out
    const signOut = async () => {
        try {
            await firebaseSignOut(auth);
            return { error: null };
        } catch (error) {
            return { error };
        }
    };

    const value = {
        signUp,
        signIn,
        signOut,
        user,
        loading,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
