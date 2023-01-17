// Copyright (c) 2023 David Isfeld
// this file contains a hook used to log out the user, by deleting the token stored in their browser and setting the user and deadlines contexts to null.

import { useAuthContext } from './useAuthContext';
import { useDeadlineContext } from './useDeadlineContext';

export const useLogout = () => {
    const { dispatch } = useAuthContext();
    const { dispatch: deadlinesDispatch } = useDeadlineContext();

    const logout = () => {
        // remove token from local storage
        localStorage.removeItem('user');

        // set user in AuthContext to null with the LOGOUT action
        dispatch({ type: 'LOGOUT'});

        // set deadlines in DeadlineContext to null
        deadlinesDispatch({ type: 'SET_DEADLINES', payload: null });

        // for testing
        console.log('logged out');
    };

    return { logout };
};