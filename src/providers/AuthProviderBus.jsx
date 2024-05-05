import { useEffect, useState } from "react";
import { createContext } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { app } from "../firebase/firebase.config";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProviderBus = ({ children }) => {
    const [busdriver, setBusdriver] = useState(null);
    const [loading, setLoading] = useState(true);

    //  const axiosPublic = useAxiosPublic();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signInbus = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);

    }

    const updatebusDriverProfile = (name, email, role, phone, gender) => {
        return updateProfile(auth.currentUser, {
            role: role, name: name, phone: phone, email: email, gender: gender,

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


                setBusdriver({
                    ...currentUser,
                    displayName,
                    photoURL
                });

                console.log('current user', currentUser);
                setLoading(false);
            } else {
                setBusdriver(null);
                setLoading(false);
            }


        });
        return () => {
            return unsubscribe();
        }
    }, [])

    const authInfo = {
        busdriver,
        loading,
        createUser,
        signInbus,
        logOut,
        updatebusDriverProfile
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProviderBus;