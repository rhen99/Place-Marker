import React, { useState, useEffect } from "react";
import { auth } from "../firebase/config";
export const AuthContext = React.createContext()
function AuthProvider({children}) {


    const [currentUser, setCurrentUser] = useState({});
    const [error, setError] = useState(null);

    const login = async (provider) => {
        try {
            await auth.signInWithPopup(provider);
            window.location.reload();
        } catch (error) {
            setError(error.message);
            
        }
    }
    const logout = async (e) => {
        e.preventDefault();
        try {
            await auth.signOut();
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
        
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if(user){
                setCurrentUser(user);
                localStorage.setItem('isAuthenticated', true);
            }else{
                setCurrentUser({});
                localStorage.removeItem('isAuthenticated');
            }
        });
        return unsubscribe
    },[])


    const value = {
        login,
        logout,
        currentUser,
        error
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
