import React, { useState, createContext, useEffect } from 'react';
import app from '../Firebase/firebase.config';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'


export const AuthContext = createContext();
const auth = getAuth(app)

const Authprovider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const userSignIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const continueWithProvider = provider => {
        setLoading(true);
        return signInWithPopup(auth, provider)
    }


    const userProfileUpdate = userInfo => {
        setLoading(true);
        return updateProfile(auth.currentUser, userInfo)
    }

    const userSignOut = () => {
        setLoading(true);
        return signOut(auth)
    }


    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        })
        return () => unSubscribe()
    }, [])

    const authInfo = {
        user,
        createUser,
        userSignIn,
        userSignOut,
        userProfileUpdate,
        continueWithProvider,
        loading,
        setLoading
    }


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default Authprovider;