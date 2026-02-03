import { Link } from 'react-router-dom';
import logo from '../../assets/logo.webp';

export const Logo = () => {
    return (
        <Link to="/">
            <img className="max-h-[55px]" src={logo} alt="UWI" />
        </Link>
    );
};
