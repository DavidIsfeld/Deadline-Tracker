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