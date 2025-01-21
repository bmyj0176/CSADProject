import React, { useState, useEffect, createContext, useContext } from 'react';
import { Outlet, Link, useLocation, useNavigate  } from "react-router-dom";


const LoginState = () => {
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const loginContext = createContext();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
          setUserLoggedIn(true);
        }
    }, []);
    
    return (
        <MyContext.Provider value={{userLoggedIn, setUserLoggedIn}}>
          {loginstate}
        </MyContext.Provider>
    );
}

export default LoginState;