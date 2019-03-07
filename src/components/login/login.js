import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextInputGroup from "../layout/TextInputGroup";
import { postlogin, clearError, signOut } from "../../actions/loginActions";
import validator from "validator";

class LoginCard extends Component {
  state = {
    email: "",
    password: "",
    authError: false
  };

  onSubmit = async evnt => {
    evnt.preventDefault();

    const { email, password } = this.state;

    if (!validator.isEmail(email)) {
      return;
    }

    if (password.length < 6 || password.length > 20) {
      return;
    }

    const authentication = {
      email,
      password,
      strategy: "local"
    };

    // LOGIN PETITION
    await this.props.postlogin(authentication);

    // this.props.history.push("/");
  };

  // input handler
  onNewData = evnt => this.setState({ [evnt.target.name]: evnt.target.value });

  onNewDataLowerCase = evnt => {
    let lowerCased = evnt.target.value;
    lowerCased = lowerCased.toLowerCase();
    this.setState({ [evnt.target.name]: lowerCased });
  };

  render() {
    const { email, password } = this.state;
    const { error, token } = this.props.store.token;

    return (
      <div className='card mb-3'>
        <div className='card-header'>
          <h1>Sign in</h1>
        </div>
        <form onSubmit={this.onSubmit}>
          <div className='card card-body mb-3'>
            <ul className='list-group mb-1'>
              <li className='list-group-item'>
                <h5>email:</h5>
                <TextInputGroup
                  name='email'
                  type='email'
                  required
                  value={email}
                  placeholder='Enter email'
                  onChange={this.onNewDataLowerCase}
                />
                {email.length === 0 ? (
                  <p />
                ) : !validator.isEmail(email) ? (
                  <p className='list-group-item' style={{ color: "red" }}>
                    Invalid email.
                  </p>
                ) : (
                  <p />
                )}
              </li>
              <li className='list-group-item'>
                <h5>password:</h5>
                <TextInputGroup
                  type='password'
                  name='password'
                  required
                  value={password}
                  placeholder='Enter password'
                  onChange={this.onNewData}
                />
                {password.length === 0 ? (
                  <p />
                ) : password.length < 6 || password.length > 20 ? (
                  <p className='list-group-item' style={{ color: "red" }}>
                    Your password must be between 6 and 20 characters. Current
                    length: {password.length}.
                  </p>
                ) : (
                  <p />
                )}
              </li>

              {!error && !token ? (
                <React.Fragment />
              ) : !error ? (
                <li className='list-group-item'>
                  <p style={{ color: "green" }}>Logged In</p>
                </li>
              ) : (
                <li className='list-group-item'>
                  <p style={{ color: "red" }}>Invalid email or password.</p>
                </li>
              )}
            </ul>
          </div>
          <input
            type='submit'
            value='Sign in'
            readOnly
            className='btn btn-light btn-block'
          />
          <br />
          <Link to={`/`}>
            <input
              onClick={() => this.props.clearError()}
              value='Go back'
              className='btn btn-light btn-block'
            />
          </Link>
        </form>
      </div>
    );
  }
}

LoginCard.propTypes = {
  postlogin: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  store: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  store: state
});

export default connect(
  mapStateToProps,
  { postlogin, clearError, signOut }
)(LoginCard);
