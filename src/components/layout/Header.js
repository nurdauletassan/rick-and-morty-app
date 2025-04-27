import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../images/Rick_and_Morty.svg'

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <img src={logo} alt="Rick and Morty" />
        </div>
        <nav className="navbar">
          <NavLink to="/" end>Characters</NavLink>
          <NavLink to="/locations">Locations</NavLink>
          <NavLink to="/episodes">Episodes</NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header; 