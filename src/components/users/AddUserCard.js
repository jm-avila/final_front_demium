import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextInputGroup from "../layout/TextInputGroup";
import { postUser } from "../../actions/userActions";
import validator from "validator";

class AddUserCard extends Component {
  state = {
    name: "",
    surname: "",
    email: "",
    telephone: "",
    roleId: "",
    nameError: false,
    surnameError: false,
    telephoneError: false,
    telephoneLengthZero: false
  };

  onSubmit = evnt => {
    evnt.preventDefault();

    const { name, surname, email, telephone, roleId } = this.state;

    if (name.length === 0) {
      alert("Name is a mandatory field!");
      return;
    }

    if (surname.length === 0) {
      alert("Surname is a mandatory field!");
      return;
    }

    if (!validator.isEmail(email)) {
      return;
    }

    if (telephone.length === 0) {
      this.setState({ telephoneLengthZero: true });
      return;
    } else if (telephone.length !== 9) {
      return;
    }

    let newUser;

    if (roleId.length === 0) {
      newUser = {
        name,
        surname,
        email,
        telephone
      };
    } else {
      newUser = {
        name,
        surname,
        email,
        telephone,
        roleId
      };
    }

    this.props.postUser(newUser);

    this.props.history.push("/users");
  };

  // input handler
  onlyStringDataName = evnt => {
    if (evnt.target.value.match(/^[A-Z a-z]*$/)) {
      this.setState({ [evnt.target.name]: evnt.target.value });
      this.setState({ nameError: false });
    } else {
      this.setState({ nameError: true });
    }
  };

  onlyStringDataSurname = evnt => {
    if (evnt.target.value.match(/^[A-Z a-z]*$/)) {
      this.setState({ [evnt.target.name]: evnt.target.value });
      this.setState({ surnameError: false });
    } else {
      this.setState({ surnameError: true });
    }
  };

  onlyNumberData = evnt => {
    if (evnt.target.value.match(/^[0-9 ]*$/)) {
      this.setState({ [evnt.target.name]: evnt.target.value });
      this.setState({ telephoneError: false });
    } else {
      this.setState({ telephoneError: true });
    }
  };

  onNewData = evnt => this.setState({ [evnt.target.name]: evnt.target.value });

  onNewDataLowerCase = evnt => {
    let lowerCased = evnt.target.value;
    lowerCased = lowerCased.toLowerCase();
    this.setState({ [evnt.target.name]: lowerCased });
  };

  render() {
    const { name, surname, email, telephone, telephoneLengthZero } = this.state;
    const { token } = this.props.store.token;
    const { roles } = this.props.store;

    return (
      <React.Fragment>
        {!token ? (
          <h1>Please login to gain access to this page!!!</h1>
        ) : (
          <div className='card mb-3'>
            <div className='card-header'>
              <h1>Add User</h1>
            </div>
            <form onSubmit={this.onSubmit}>
              <div className='card card-body mb-3'>
                <ul className='list-group mb-1'>
                  <li className='list-group-item'>
                    <h5>User name:</h5>
                    <TextInputGroup
                      name='name'
                      value={name}
                      placeholder='Enter the user name'
                      onChange={this.onlyStringDataName}
                    />
                    {this.state.nameError ? (
                      <p style={{ color: "red" }}>
                        Invalid character, Name can only have letters and
                        spaces.
                      </p>
                    ) : null}
                  </li>
                  <li className='list-group-item'>
                    <h5>User surname:</h5>
                    <TextInputGroup
                      name='surname'
                      value={surname}
                      placeholder='Enter the user surname'
                      onChange={this.onlyStringDataSurname}
                    />
                    {this.state.surnameError ? (
                      <p style={{ color: "red" }}>
                        Invalid character, surname can only have letters and
                        spaces.
                      </p>
                    ) : null}
                  </li>
                  <li className='list-group-item'>
                    <h5>User email:</h5>
                    <TextInputGroup
                      name='email'
                      type='email'
                      required
                      value={email}
                      placeholder='Enter the user email'
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
                    <h5>User telephone:</h5>
                    <TextInputGroup
                      name='telephone'
                      required
                      value={telephone}
                      placeholder='Enter the user telephone'
                      onChange={this.onlyNumberData}
                    />
                    {this.state.telephoneError ? (
                      <p style={{ color: "red" }}>
                        Invalid character, telephone can only be made up of
                        numbers.
                      </p>
                    ) : (
                      <p />
                    )}
                    {(telephone.length !== 9 && telephone.length > 0) ||
                    (telephone.length !== 9 && telephoneLengthZero) ? (
                      <p style={{ color: "red" }}>
                        A telephone must have 9 digits. Current length:
                        {telephone.length}
                      </p>
                    ) : (
                      <p />
                    )}
                  </li>

                  <li className='list-group-item'>
                    <h5>Role:</h5>
                    <select name='roleId' onChange={this.onNewData}>
                      <option value={""}>Choose a role</option>
                      {roles.map((role, i) => (
                        <option key={i} value={role._id}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                  </li>
                </ul>
              </div>
              <input
                type='submit'
                value='Add'
                readOnly
                className='btn btn-light btn-block'
              />
              <br />
              <Link to={`/users`}>
                <input
                  readOnly
                  value='Go back'
                  className='btn btn-light btn-block'
                />
              </Link>
            </form>
          </div>
        )}
      </React.Fragment>
    );
  }
}

AddUserCard.propTypes = {
  store: PropTypes.object.isRequired,
  postUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  store: state
});

export default connect(
  mapStateToProps,
  { postUser }
)(AddUserCard);
