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
        <form className="signup" onSubmit={handleSubmit}>
            <h2>Sign up</h2>

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

            <button disabled={isLoading}>Sign Up</button>
            {error && <div className="error">{error}</div>}
        </form>
     );
};

export default Signup;