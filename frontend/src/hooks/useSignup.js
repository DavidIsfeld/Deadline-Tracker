// this hook will contain the logic used to sign up a user in from the frontend

import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { useNavigate } from 'react-router-dom';

export const useSignup = () => {
    // error and isLoading will be used to display errors to the user and make sure that they cannot submit the form again while they
    // are being signed up.
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();

    const signup = async (email, password) => {
        setIsLoading(true);
        // set error to null in case there was an error previously and the user is trying to sign up again
        setError(null);

        // send a post request to the signup api containing the entered in email and password
        const response = await fetch('/api/user/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        });

        // get the response in json format
        const json = await response.json();

        if (!response.ok) {
            setIsLoading(false);
            setError(json.error);
        }

        if (response.ok) {
            // put token in local storage of web browser so that user does not have to log in everytime
            localStorage.setItem('user', JSON.stringify(json));

            // update the auth context
            dispatch({type: 'LOGIN', payload: json});

            setIsLoading(false);

            // for testing
            console.log('signed up');

            // send user to home page
            navigate('/');
        }
    };

    return {signup, isLoading, error};
};