import { Link } from 'react-router-dom';
import Dropdown from './Dropdown';
import { FaHome } from 'react-icons/fa';
import './navbar.scss';
const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">
        <FaHome size={24} />
      </Link>
      <div className="navgroup">
        <Link className="nav-link" to="/notes">
          NOTES
        </Link>
        <Link className="nav-link" to="/gallery">
          GALLERY
        </Link>

        <Dropdown
          label="OTHER"
          items={[
            { to: '/calculator', label: 'Calculator' },
            { to: '/simulator', label: 'Simulator' },
            { to: '/camerasettings', label: 'Camera Settings' },
            { to: '/about', label: 'About' },
          ]}
        />
      </div>
    </nav>
  );
};

export default Navbar;
