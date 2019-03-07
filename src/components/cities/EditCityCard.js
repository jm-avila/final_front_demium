import React, { Component } from "react";
import TextInputGroup from "../layout/TextInputGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateCity } from "../../actions/cityActions";
import axios from "axios";
import token from "../../actions/loginActions";
import { Link } from "react-router-dom";
import { URL } from "../../actions/URL";

class EditCityCard extends Component {
  state = {
    name: "",
    address: "",
    telephone: "",
    users: [],
    nameError: false,
    telephoneError: false,
    telephoneLengthZero: false
  };

  componentDidMount() {
    this.props.store.cities.find(
      city => city._id === this.props.match.params.id
    ) &&
      this.props.store.cities
        .find(city => city._id === this.props.match.params.id)
        .users.map(city => this.choosenUsers.push(city));

    const getCity = async () => {
      const { id } = this.props.match.params;
      const res = await axios
        .get(`${URL}city/${id}`, {
          headers: { Authorization: token }
        })
        .catch(err => console.log("Failed connection"));
      const { name, address, telephone, users } = res.data;
      this.setState({
        name,
        address,
        telephone,
        users
      });
    };
    getCity();
  }

  onSubmit = evnt => {
    evnt.preventDefault();

    const { name, address, telephone, users } = this.state;

    if (name.length === 0) {
      alert("Name is a mandatory field!");
      return;
    }

    if (address.length === 0) {
      alert("Address is a mandatory field!");
      return;
    }

    if (telephone.length === 0) {
      this.setState({ telephoneLengthZero: true });
      return;
    } else if (telephone.length !== 9) {
      return;
    }

    const { id } = this.props.match.params;

    const updatedCity = {
      id,
      name,
      address,
      telephone,
      users
    };

    this.props.updateCity(id, updatedCity);

    this.props.history.push("/cities");
  };

  // input handler
  onlyStringData = evnt => {
    if (evnt.target.value.match(/^[A-Z a-z]*$/)) {
      this.setState({ [evnt.target.name]: evnt.target.value });
      this.setState({ nameError: false });
    } else {
      this.setState({ nameError: true });
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

  // City members handlers
  choosenUsers = [];
  addUser = evnt => {
    if (evnt.target.value === "No user") {
      return;
    }
    this.choosenUsers.push({ id: evnt.target.value });
    this.setState({ users: this.choosenUsers });
  };
  removeUser = id => {
    this.choosenUsers = this.choosenUsers.filter(user => user.id !== id);
    this.setState({ users: this.choosenUsers });
  };

  render() {
    const { name, address, telephone, telephoneLengthZero } = this.state;
    const { roles, users, cities } = this.props.store;
    const { token } = this.props.store.token;

    return (
      <React.Fragment>
        {!token ? (
          <h1>Please login to gain access to this page!!!</h1>
        ) : (
          <div className='card mb-3'>
            <div className='card-header'>
              <h1>Update City</h1>
            </div>
            <form onSubmit={this.onSubmit}>
              <div className='card card-body mb-3'>
                <ul className='list-group mb-1'>
                  <li className='list-group-item'>
                    <h5>Name:</h5>
                    <TextInputGroup
                      name='name'
                      required
                      value={name}
                      placeholder={name}
                      onChange={this.onlyStringData}
                    />
                    {this.state.nameError ? (
                      <p style={{ color: "red" }}>
                        Invalid character, Name can olny have letters and
                        spaces.
                      </p>
                    ) : null}
                  </li>
                  <li className='list-group-item'>
                    <h5>Address:</h5>
                    <TextInputGroup
                      name='address'
                      required
                      value={address}
                      placeholder={"this.state.address"}
                      onChange={this.onNewData}
                    />
                  </li>
                  <li className='list-group-item'>
                    <h5>Telephone: </h5>
                    <TextInputGroup
                      name='telephone'
                      type='tel'
                      required
                      value={telephone}
                      placeholder={"this.state.phone"}
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
                </ul>
                <ul className='list-group mb-1'>
                  <li className='list-group-item'>
                    <h5>Demium users:</h5>
                    <select name='userId' onChange={this.addUser}>
                      <option value='No user'>Select the user</option>
                      {users
                        .filter(user =>
                          !this.choosenUsers.find(
                            choosenUser => choosenUser.id === user._id
                          ) && roles.find(role => role._id === user.roleId)
                            ? roles.find(role => role._id === user.roleId)
                                .isDemium
                            : false
                        )
                        .filter(
                          user =>
                            !cities.find(city =>
                              city.users.find(
                                cityUser => cityUser.id === user._id
                              )
                            )
                        )
                        .map((user, i) => (
                          <option key={i} value={user._id}>
                            {`${user.name} ${user.surname}`}
                          </option>
                        ))}
                    </select>
                  </li>
                  <li className='list-group-item'>
                    <h5>Selected users:</h5>
                    {this.choosenUsers.map((choosenUser, i) =>
                      users.find(user => user._id === choosenUser.id) ? (
                        <p key={i}>
                          {`${
                            users.find(user => user._id === choosenUser.id).name
                          } ${
                            users.find(user => user._id === choosenUser.id)
                              .surname
                          } `}
                          <span
                            name='id'
                            key={i}
                            value={choosenUser.id}
                            style={{
                              cursor: "pointer",
                              textAlign: "right",
                              color: "red"
                            }}
                            onClick={() => this.removeUser(choosenUser.id, i)}
                          >
                            Remove
                          </span>
                        </p>
                      ) : null
                    )}
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
              <Link to={`/cities`}>
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

EditCityCard.propTypes = {
  store: PropTypes.object.isRequired,
  updateCity: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  store: state
});
export default connect(
  mapStateToProps,
  { updateCity }
)(EditCityCard);
