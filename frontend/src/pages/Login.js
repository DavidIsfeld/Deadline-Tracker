// Copyright (c) 2023 David Isfeld
// this file contains the login page, which consists of a form the user fills in

import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login, error, isLoading} = useLogin();

    const handleSubmit = async (e) => {
        // prevent the default submit handling so that the page is not refreshed
        e.preventDefault();

        await login(email, password);
    };

    return ( 
        <form className="login-signup" onSubmit={handleSubmit}>
            <h3>Log In</h3>

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

            <button disabled={isLoading} className="login-signup-button">Log In</button>
            {error && <div className="login-singup-error"><span className="make-red"><strong>{error}</strong></span></div>}
            <p className="copyright">Copyright (c) 2023 David Isfeld</p>
        </form>
     );
};

export default Login;