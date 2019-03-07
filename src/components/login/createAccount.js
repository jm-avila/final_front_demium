import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextInputGroup from "../layout/TextInputGroup";
import { postregister, clearError } from "../../actions/loginActions";
import validator from "validator";

class CreateAccountCard extends Component {
  state = {
    email: "",
    password: "",
    confirmPassword: "",
    authError: false
  };

  onSubmit = async evnt => {
    evnt.preventDefault();

    const { email, password, confirmPassword } = this.state;

    if (!validator.isEmail(email)) {
      return;
    }

    if (password.length < 6 || password.length > 20) {
      return;
    } else if (password !== confirmPassword) {
      return;
    }

    const newAccount = {
      email,
      password
    };

    // REGISTER PETITION
    await this.props.postregister(newAccount);
  };

  // input handler

  onNewData = evnt => this.setState({ [evnt.target.name]: evnt.target.value });

  onNewDataLowerCase = evnt => {
    let lowerCased = evnt.target.value;
    lowerCased = lowerCased.toLowerCase();
    this.setState({ [evnt.target.name]: lowerCased });
  };

  render() {
    const { email, password, confirmPassword } = this.state;
    const { error, account } = this.props.store.token;

    return (
      <div className='card mb-3'>
        <div className='card-header'>
          <h1>Sign up</h1>
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
                  placeholder='Enter your email'
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
                  value={password}
                  placeholder='Enter password'
                  onChange={this.onNewData}
                />
                <TextInputGroup
                  type='password'
                  name='confirmPassword'
                  value={confirmPassword}
                  placeholder='Confirm Password'
                  onChange={this.onNewData}
                />
                {password.length === 0 ? (
                  <p />
                ) : password !== confirmPassword ? (
                  <p className='list-group-item' style={{ color: "red" }}>
                    Passwords don't match
                  </p>
                ) : (
                  <p />
                )}
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
              {!error ? (
                <React.Fragment />
              ) : (
                <li className='list-group-item'>
                  <p style={{ color: "red" }}>
                    Your email is already registered.
                  </p>
                </li>
              )}

              {!account ? (
                <React.Fragment />
              ) : (
                <li className='list-group-item'>
                  <p style={{ color: "green" }}>
                    Account created successfully, go on and log in!!!
                  </p>
                </li>
              )}
            </ul>
          </div>
          <input
            type='submit'
            value='Create Account'
            readOnly
            className='btn btn-light btn-block'
          />
          <br />
          <Link to={`/login`}>
            <input
              onClick={() => this.props.clearError()}
              value='Go to Login'
              className='btn btn-light btn-block'
            />
          </Link>
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

CreateAccountCard.propTypes = {
  postregister: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  store: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  store: state
});

export default connect(
  mapStateToProps,
  { postregister, clearError }
)(CreateAccountCard);
