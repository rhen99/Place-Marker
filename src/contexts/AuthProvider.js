import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
export const AuthContext = React.createContext()
function AuthProvider({children}) {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const history = useHistory();

    const login = () => {
        setIsAuthenticated(true);
        history.push('/');
    }
    const logout = (e) => {
        e.preventDefault();
        setIsAuthenticated(false);
        history.push('/login');
    }

    useEffect(() => {
        if(isAuthenticated){
            localStorage.setItem('isAuthenticated', true);
        }else{
            localStorage.removeItem('isAuthenticated');
        }
    }, [isAuthenticated])


    const value = {
        login,
        logout,
        isAuthenticated
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
