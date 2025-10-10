import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase/firebase.init';
import { AuthContext } from './AuthContext';
import { GoogleAuthProvider } from "firebase/auth";
import { useEffect, useState } from 'react';

const AuthProvider = ({children}) => {
    // google provider
    const googleProvider = new GoogleAuthProvider();
    // user data loadin state
    const [userDataLoading, setUserDataLoading] = useState(true);
    // user data
    const [user, setUser] = useState(null);
    // user create using email
    const createUser = (email, password) => {
        setUserDataLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    };

    // sign in user 
    const signInUser = (email, password) => {
        setUserDataLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };
    // password reset email
    const resetPass = (email) => {
        setUserDataLoading(true);
        return sendPasswordResetEmail(auth, email);
    };
    // update user profile
    const updateUserProfile = (profileInfo) => {
        return updateProfile(auth.currentUser, profileInfo);
    }
    // user login using google
    const googleLogIn = () => {
        setUserDataLoading(true);
        return signInWithPopup(auth, googleProvider)
    };

    // user logout
    const userLogOut = () => {
        setUserDataLoading(true);
        return signOut(auth);
    }

    // user data observer
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
                setUserDataLoading(false);
                setUser(currentUser);
        });


        return () => {
            unSubscribe();
        }
    },[]);

    const authInfo ={createUser, signInUser, googleLogIn, setUserDataLoading, userLogOut, user, userDataLoading, resetPass, updateUserProfile}
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;