import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';

const NavBar = () => {
    const { logout } = useLogout();

    const handleClick = () => {
        logout();
    };

    return ( 
        <nav>
            <div>
                <Link to='/signup'>Signup</Link>
                <Link to='/login'>Login</Link>
            </div>
            <div>
                <button onClick={handleClick}>Log Out</button>
            </div>
        </nav>
     );
}
 
export default NavBar;