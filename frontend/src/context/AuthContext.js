// Copyright (c) 2023 David Isfeld
// this file stores the logged in user as a context so properties of the user can be accessed in other parts of the program.

import { createContext, useReducer, useEffect } from 'react';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload };
        case 'LOGOUT':
            return { user: null };
        default:
            return state;
    }
};

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    });

    // when the web app is first opened, check to see if a token is in the user's local storage
    // if there is a token log them in
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            dispatch({ type: 'LOGIN', payload: user });
        }
    }, []);

    return ( 
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
     );
};