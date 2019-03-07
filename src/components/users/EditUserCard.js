import React, { Component } from "react";
import TextInputGroup from "../layout/TextInputGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateUser } from "../../actions/userActions";
import axios from "axios";
import token from "../../actions/loginActions";
import { Link } from "react-router-dom";
import { URL } from "../../actions/URL";
import validator from "validator";

class EditIdeaCard extends Component {
  state = {
    name: "",
    surname: "",
    email: "",
    telephone: "",
    roleId: "",
    previousRoleId: "",
    nameError: false,
    surnameError: false,
    telephoneError: false,
    telephoneLengthZero: false
  };

  componentDidMount() {
    const getUser = async () => {
      const { id } = this.props.match.params;
      const res = await axios
        .get(`${URL}user/${id}`, {
          headers: { Authorization: token }
        })
        .catch(err => console.log("Failed connection"));
      const { name, surname, email, telephone, roleId } = res.data;
      this.setState({
        name,
        surname,
        email,
        telephone,
        roleId,
        previousRoleId: roleId
      });
    };
    getUser();
  }

  onSubmit = evnt => {
    evnt.preventDefault();

    const {
      name,
      surname,
      email,
      telephone,
      roleId,
      previousRoleId
    } = this.state;
    const { id } = this.props.match.params;
    const { teams, cities } = this.props.store;

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

    if (roleId === "No role") {
      alert("Choose a role or no role");
      return;
    }

    if (roleId !== previousRoleId) {
      if (
        !!teams.find(team =>
          team.users.find(teamUser => teamUser.userId === id)
        )
      ) {
        alert(
          `${name} ${surname} is a team member. You can only change the role of non team members. To change the role you must remove ${name} from the team.`
        );
        return;
      }
      if (
        !!cities.find(city => city.users.find(cityUser => cityUser.id === id))
      ) {
        alert(
          `${name} ${surname} is a Demium member with an assigned city. You can only change the role of Demium members with no assigned cities. To change the role you must remove ${name} from the assigned city.`
        );
        return;
      }
    }

    let updatedUser;

    if (roleId.length === 0) {
      updatedUser = {
        _id: id,
        name,
        surname,
        email,
        telephone
      };
    } else {
      updatedUser = {
        _id: id,
        name,
        surname,
        email,
        telephone,
        roleId
      };
    }
    this.props.updateUser(id, updatedUser);

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
    const {
      name,
      surname,
      email,
      telephone,
      roleId,
      telephoneLengthZero
    } = this.state;
    const { token } = this.props.store.token;
    const { roles } = this.props.store;

    return (
      <React.Fragment>
        {!token ? (
          <h1>Please login to gain access to this page!!!</h1>
        ) : (
          <div className='card mb-3'>
            <div className='card-header'>
              <h1>Update User</h1>
            </div>
            <form onSubmit={this.onSubmit}>
              <div className='card card-body mb-3'>
                <ul className='list-group mb-1'>
                  <li className='list-group-item'>
                    <h5>User name:</h5>
                    <TextInputGroup
                      name='name'
                      value={name}
                      placeholder={name}
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
                      placeholder={surname}
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
                      placeholder={email}
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
                      type='tel'
                      required
                      value={telephone}
                      placeholder={telephone}
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
                      <option value={"No role"}>Choose a role</option>
                      {roles.map((role, i) => (
                        <option key={i} value={role._id}>
                          {role.name}
                        </option>
                      ))}
                      <option value={""}>Choose for no role</option>
                    </select>
                    <p>
                      Current role:{" "}
                      {roles.find(role => role._id === roleId)
                        ? roles.find(role => role._id === roleId).name
                        : "No role"}
                    </p>
                  </li>
                </ul>
              </div>
              <input
                type='submit'
                value='Update'
                readOnly
                className='btn btn-light btn-block'
              />
              <br />
              <Link to={`/users`}>
                <input
                  value='Go back'
                  readOnly
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

EditIdeaCard.propTypes = {
  store: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  store: state
});

export default connect(
  mapStateToProps,
  { updateUser }
)(EditIdeaCard);
