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
        <Dropdown
          label="GALLERY"
          items={[
            { to: '/gallery', label: 'All' },
            { to: '/gallery/moon', label: 'Moon' },
            { to: '/gallery/planets', label: 'Planets' },
            { to: '/gallery/stars', label: 'Stars' },
            { to: '/gallery/dsos', label: 'DSOs' },
          ]}
        />

        <Dropdown
          label="OTHER"
          items={[
            { to: '/calculator', label: 'Calculator' },
            { to: '/othernotes', label: 'Notes' },
            { to: '/about', label: 'About' },
            { to: '/contact', label: 'Contact' },
          ]}
        />
      </div>
    </nav>
  );
};

export default Navbar;
