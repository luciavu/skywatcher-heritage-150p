import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavBar.scss';

const Dropdown = ({ label, items }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <div className="dropdown">
      <button className="dropdown-button" onClick={() => setOpen((prev) => !prev)}>
        {label}
      </button>
      {open && (
        <div className="dropdown-content">
          {items.map((item) => (
            <Link key={item.to} to={item.to} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
