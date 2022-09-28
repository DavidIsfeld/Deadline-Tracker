import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const NavBar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleClick = () => {
        logout();
    };

    return ( 
        <header>
            <div className="navbar">
                <Link to="/">Deadlines</Link>
                <nav>
                    {!user && (
                    <div>
                        <Link to='/signup'>Signup</Link>
                        <Link to='/login'>Login</Link>
                    </div>
                    )}
                    {user && (
                    <div>
                        <span>{user.email}</span>
                        <button onClick={handleClick}>Log Out</button>
                    </div>
                    )}
                </nav>
            </div>
        </header>
     );
}
 
export default NavBar;