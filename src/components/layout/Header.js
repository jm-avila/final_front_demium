import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Header extends Component {
  render() {
    return (
      <nav
        className='navbar navbar-expand-sm navbar-dark mb-3 py-0'
        style={{ backgroundColor: "#e45a4c" }}
      >
        <div className='container'>
          <h1 className='navbar-brand'>Demium</h1>
        </div>
        <div>
          <ul className='navbar-nav mr-auto'>
            <li className='nav-item'>
              <Link to='/' className='nav-link'>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/teams' className='nav-link'>
                Teams
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/ideas' className='nav-link'>
                Ideas
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/cities' className='nav-link'>
                Cities
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/users' className='nav-link'>
                Users
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
