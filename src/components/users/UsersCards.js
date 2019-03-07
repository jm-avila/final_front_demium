import React, { Component } from "react";
import User from "./User";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getUsers } from "../../actions/userActions";
import { getRoles } from "../../actions/roleActions";
import { getTeams } from "../../actions/teamActions";
import { getCities } from "../../actions/cityActions";

class UsersCards extends Component {
  componentDidMount() {
    const { users, roles, teams, cities } = this.props.store;
    const { token } = this.props.store.token;
    if (token) {
      cities.length === 0 && this.props.getCities();
      users.length === 0 && this.props.getUsers();
      roles.length === 0 && this.props.getRoles();
      teams.length === 0 && this.props.getTeams();
    }
  }

  render() {
    const { users, roles, teams, cities } = this.props.store;
    const { token } = this.props.store.token;

    return (
      <React.Fragment>
        {!token ? (
          <h1>Please login to gain access to this page!!!</h1>
        ) : (
          <div className='card card-body mb-3'>
            <h1>Users</h1>
            <Link to='/users/add'>
              <i
                style={{
                  cursor: "pointer",
                  color: "blue"
                }}
                onClick={() => null}
              >
                New user
              </i>
            </Link>
            <table>
              <thead>
                <tr>
                  <td>
                    <h5>Name</h5>
                  </td>
                  <td>
                    <h5>Surname</h5>
                  </td>
                  <td>
                    <h5>Email</h5>
                  </td>
                  <td>
                    <h5>Telephone</h5>
                  </td>
                  <td>
                    <h5>Role</h5>
                  </td>
                  <td> </td>
                  <td> </td>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 &&
                roles.length === 0 &&
                teams.length &&
                cities.length === 0 ? (
                  <tr>
                    <td colSpan='7'>
                      <h1>No users, add the first one!!!</h1>
                      <p>
                        If you thinks this is a mistake, refresh the page and
                        log back in. Sorry, @_@
                      </p>
                    </td>
                  </tr>
                ) : (
                  users.map((user, i) => (
                    <User
                      key={i}
                      id={user._id}
                      name={user.name}
                      surname={user.surname}
                      email={user.email}
                      telephone={user.telephone}
                      roleId={user.roleId}
                    />
                  ))
                )}
              </tbody>
            </table>
            {/*

          */}
          </div>
        )}
      </React.Fragment>
    );
  }
}

UsersCards.propTypes = {
  store: PropTypes.object.isRequired,
  getUsers: PropTypes.func.isRequired,
  getRoles: PropTypes.func.isRequired,
  getTeams: PropTypes.func.isRequired,
  getCities: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  store: state
});

export default connect(
  mapStateToProps,
  { getUsers, getRoles, getTeams, getCities }
)(UsersCards);
