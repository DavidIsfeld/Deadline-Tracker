import { Link } from 'react-router-dom';

const NavBar = () => {

    return ( 
        <nav>
            <div>
                <Link to='/login'>Login</Link>
            </div>
        </nav>
     );
}
 
export default NavBar;