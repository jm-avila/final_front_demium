import React from "react";
import { Link } from "react-router-dom";

export default () => {
  return (
    <React.Fragment>
      <div style={{ backgroundImage: "./img/landing.jpg" }}>
        <h1 className='display-4'>Welcome to Demium</h1>
        <p className='lead'>The best app to manage startups</p>
        <p className='text-secondary'>Version 1.0.0</p>
        <hr />
      </div>
      <div className=' card-body mb-3'>
        <ul className='navbar-nav mr-auto'>
          <li className='nav-item'>
            <Link to='/login' className='nav-link'>
              Login
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/register' className='nav-link'>
              Create Account
            </Link>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};
