import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container">
      <Link className="navbar-brand" to="/">StudentManager</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/add">Add Student</Link></li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Header;
