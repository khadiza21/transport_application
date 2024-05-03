import { useEffect, useState } from "react";
import { createContext } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { app } from "../firebase/firebase.config";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {


    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);

    }


    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const updateUserProfile = (name, email, role, phone, gender) => {
        return updateProfile(auth.currentUser, {
            rolename: role, name: name, phone: phone, email: email, gender: gender,

        });
    }
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            if (currentUser) {
                let displayName = currentUser.name;
                let photoURL = currentUser.photoURL;


                setUser({
                    ...currentUser,
                    displayName,
                    photoURL
                });

                console.log('current user', currentUser);
                setLoading(false);
            } else {
                setUser(null);
                setLoading(false);
            }


        });
        return () => {
            return unsubscribe();
        }
    }, [])

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        logOut,
        googleSignIn,
        updateUserProfile
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;