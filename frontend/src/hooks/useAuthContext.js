// Copyright (c) 2023 David Isfeld
// use this hook to get to AuthContext so it is not used outside of AuthContextProvider

import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw Error('useAuthContext must be provided inside a AuthContextProvider');
    }

    return context;
};