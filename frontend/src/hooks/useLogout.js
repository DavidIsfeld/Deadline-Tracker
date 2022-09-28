import { useAuthContext } from './useAuthContext';

export const useLogout = () => {
    const { dispatch } = useAuthContext();

    const logout = () => {
        // remove token from local storage
        localStorage.removeItem('user');

        // set user in AuthContext to null with the LOGOUT action
        dispatch({ type: 'LOGOUT'});

        // for testing
        console.log('logged out');
    };

    return { logout };
};