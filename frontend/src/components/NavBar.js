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
                <nav>
                    {!user && (
                    <div>
                        <Link to='/signup'><strong>Signup</strong></Link>
                        <Link to='/login'><strong>Login</strong></Link>
                    </div>
                    )}
                    {user && (
                    <div>
                        <span className="nav-organize"><strong>Logged in as: <span class="make-red">{user.email}</span></strong></span>
                        <button onClick={handleClick} className="nav-organize-2"><strong>Log Out</strong></button>
                    </div>
                    )}
                </nav>
            </div>
        </header>
     );
}
 
export default NavBar;