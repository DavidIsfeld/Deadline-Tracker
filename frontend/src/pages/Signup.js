// Copyright (c) 2023 David Isfeld
// this file contains the sign up page, which consists of a form the user fills in

import { useState } from 'react';
import { useSignup } from '../hooks/useSignup';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {signup, error, isLoading} = useSignup();

    const handleSubmit = async (e) => {
        // prevent the default submit handling so that the page is not refreshed
        e.preventDefault();

        await signup(email, password);
    };

    return ( 
        <form className="login-signup" onSubmit={handleSubmit}>
            <h3>Sign up</h3>

            <label>Email:</label>
            <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />

            <label>Password:</label>
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />

            <button disabled={isLoading} className="login-signup-button">Sign Up</button>
            {error && <div className="login-singup-error"><span className="make-red"><strong>{error}</strong></span></div>}
            <p className="copyright">Feel free to use a fake email as I currently do not check if emails are valid</p>
            <p className="copyright">Copyright (c) 2023 David Isfeld</p>
        </form>
     );
};

export default Signup;