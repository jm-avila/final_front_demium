import React, { Component } from "react";
import TextInputGroup from "../layout/TextInputGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateTeam } from "../../actions/teamActions";
import { deleteTeam } from "../../actions/teamActions";
import axios from "axios";
import token from "../../actions/loginActions";
import { Link } from "react-router-dom";
import { URL } from "../../actions/URL";

class EditTeamCard extends Component {
  state = {
    name: "",
    cityId: "No City",
    users: [],
    nameError: false
  };

  componentDidMount() {
    this.props.store.teams.find(
      team => team._id === this.props.match.params.id
    ) &&
      this.props.store.teams
        .find(team => team._id === this.props.match.params.id)
        .users.map(teamUser => this.choosenUsers.push(teamUser));

    const getTeam = async () => {
      const { id } = this.props.match.params;
      const res = await axios
        .get(`${URL}team/${id}`, {
          headers: { Authorization: token }
        })
        .catch(err => console.log("Failed connection"));
      const { name, cityId, users } = res.data;
      this.setState({
        name,
        cityId,
        users
      });
    };
    getTeam();
  }

  onSubmit = evnt => {
    evnt.preventDefault();

    const { name, cityId, users } = this.state;
    const { id } = this.props.match.params;

    if (name.length === 0) {
      alert("Name is a mandatory field!");
      return;
    }

    if (cityId === "No City") {
      alert("City is a mandatory field!");
    }

    if (users.length === 0) {
      if (
        window.confirm(
          `All teams must have at least one member. If you update the ${name} team with no members it will be deleted. Do you want to proceed?`
        )
      ) {
        this.props.deleteTeam(id);
      } else {
        return;
      }
    }

    const updatedTeam = {
      id,
      name,
      cityId,
      users
    };

    this.props.updateTeam(id, updatedTeam);

    this.props.history.push("/teams");
  };

  onlyStringData = evnt => {
    if (evnt.target.value.match(/^[A-Z a-z]*$/)) {
      this.setState({ [evnt.target.name]: evnt.target.value });
      this.setState({ nameError: false });
    } else {
      this.setState({ nameError: true });
    }
  };

  onNewData = evnt => this.setState({ [evnt.target.name]: evnt.target.value });

  // Team members handlers
  choosenUsers = [];
  addUser = evnt => {
    if (evnt.target.value === "No user") {
      return;
    }
    this.choosenUsers.push({ userId: evnt.target.value });
    this.setState({ users: this.choosenUsers });
  };
  removeUser = uId => {
    this.choosenUsers = this.choosenUsers.filter(user => user.userId !== uId);
    this.setState({ users: this.choosenUsers });
  };

  render() {
    const { cities, users, roles, teams } = this.props.store;
    const { token } = this.props.store.token;
    const { name, cityId } = this.state;

    return (
      <React.Fragment>
        {!token ? (
          <h1>Please login to gain access to this page!!!</h1>
        ) : (
          <div className='card mb-3'>
            <div className='card-header'>
              <h1>Update Team</h1>
            </div>
            <form onSubmit={this.onSubmit}>
              <div className='card card-body mb-3'>
                <ul className='list-group mb-1'>
                  <li className='list-group-item'>
                    <h5>Team name:</h5>
                    <TextInputGroup
                      name='name'
                      value={name}
                      placeholder={name}
                      onChange={this.onlyStringData}
                    />
                    {this.state.nameError ? (
                      <p style={{ color: "red" }}>
                        Invalid character, Name can only have letters and
                        spaces.
                      </p>
                    ) : null}
                  </li>
                  <li className='list-group-item'>
                    <h5>City:</h5>
                    <select name='cityId' onChange={this.onNewData}>
                      <option value='No City'>Choose a city</option>
                      {cities.map((city, i) => (
                        <option key={i} value={city._id}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                    <p>
                      Current city:{" "}
                      {cities.find(city => city._id === cityId)
                        ? cities.find(city => city._id === cityId).name
                        : "No City"}
                    </p>
                  </li>
                </ul>
                <h4>Team members</h4>
                <ul className='list-group mb-1'>
                  <li className='list-group-item'>
                    <h5>Available users:</h5>
                    <select name='userId' onChange={this.addUser}>
                      <option value='No user'>Select the user</option>
                      {users
                        .filter(
                          user =>
                            !!user.roleId &&
                            !this.choosenUsers.find(
                              choosenUser => choosenUser.userId === user._id
                            ) &&
                            !roles.find(role => role._id === user.roleId)
                              .isDemium
                        )
                        .filter(
                          user =>
                            !teams.find(team =>
                              team.users.find(
                                teamUser => teamUser.userId === user._id
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
                      users.find(user => user._id === choosenUser.userId) ? (
                        <p key={i}>
                          {`${
                            users.find(user => user._id === choosenUser.userId)
                              .name
                          } ${
                            users.find(user => user._id === choosenUser.userId)
                              .surname
                          } `}
                          <span
                            name='userId'
                            key={i}
                            value={choosenUser.userId}
                            style={{
                              cursor: "pointer",
                              textAlign: "right",
                              color: "red"
                            }}
                            onClick={() =>
                              this.removeUser(choosenUser.userId, i)
                            }
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
              <Link to={`/teams`}>
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

EditTeamCard.propTypes = {
  store: PropTypes.object.isRequired,
  updateTeam: PropTypes.func.isRequired,
  deleteTeam: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  store: state
});

export default connect(
  mapStateToProps,
  { updateTeam, deleteTeam }
)(EditTeamCard);
