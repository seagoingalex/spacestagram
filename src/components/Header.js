import React from "react";

// react-router-dom Imports
import { Link, NavLink } from 'react-router-dom';

function Header({ isLoggedIn, setLogIn, currentTeam }) {

  const handleLogOut = () => {
    setLogIn(!isLoggedIn)
  }


  return (
   <nav className="header-container">

      <div className="header-left">

          <NavLink to="/" id="header-logo">
          SUPERTEAM
          </NavLink>

        <div className="navbar-container">
          <NavLink className="button" to="/" exact activeStyle={{color: "#ffb199"}} style={{ textDecoration: 'none' }}>
          Home
          </NavLink>
          {isLoggedIn ? 
          <NavLink className="button" to="/team" exact activeStyle={{color: "#ffb199"}} style={{ textDecoration: 'none' }}>
           Your Team
          </NavLink>
           : null }
          <NavLink className="button" to="/addhero" exact activeStyle={{color: "#ffb199"}} style={{ textDecoration: 'none' }} >
          Create Hero 
          </NavLink>
        </div>
      </div>

      <div className="header-right">
        {isLoggedIn ? <button onClick={handleLogOut}>Sign Out</button> 
        :
        <Link to="/signin" className="navbar-btn">
        <button>Sign in</button>
        </Link>
        }
      </div>

   </nav>
  );
}

export default Header;
