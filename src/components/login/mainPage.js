import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { signOut } from "../../actions/loginActions";

class MainPage extends Component {
  render() {
    const { token } = this.props.store.token;
    const { signOut } = this.props;

    return (
      <React.Fragment>
        <div style={{ backgroundImage: "./img/landing.jpg" }}>
          <h1 className='display-4'>Demium startups</h1>
          <p className='lead'>
            Pre-team <br />
            Pre-idea <br />
            Startup Incubator
          </p>
          <p className='text-secondary'>Version 1.0.0</p>
          <hr />
        </div>
        <div className=' card-body mb-3'>
          <ul className='navbar-nav mr-auto'>
            {!token ? (
              <React.Fragment>
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
              </React.Fragment>
            ) : (
              <React.Fragment>
                <li className='nav-item' style={{ color: "green" }}>
                  Logged In
                </li>
                <li>
                  <button onClick={() => signOut()} className='btn btn-light '>
                    Sign out
                  </button>
                </li>
              </React.Fragment>
            )}
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

MainPage.propTypes = {
  store: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  store: state
});

export default connect(
  mapStateToProps,
  { signOut }
)(MainPage);
