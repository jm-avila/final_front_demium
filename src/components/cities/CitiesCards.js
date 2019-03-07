import React, { Component } from "react";
import City from "./City";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getCities } from "../../actions/cityActions";
import { getUsers } from "../../actions/userActions";
import { getRoles } from "../../actions/roleActions";
import { getTeams } from "../../actions/teamActions";

class CitiesCards extends Component {
  componentDidMount() {
    const { cities, users, roles, teams } = this.props.store;
    const { token } = this.props.store.token;
    if (token) {
      cities.length === 0 && this.props.getCities();
      users.length === 0 && this.props.getUsers();
      roles.length === 0 && this.props.getRoles();
      teams.length === 0 && this.props.getTeams();
    }
  }

  actionAxios() {
    const { cities, users, roles, teams } = this.props.store;
    const { token } = this.props.store.token;
    if (token) {
      cities.length === 0 && this.props.getCities();
      users.length === 0 && this.props.getUsers();
      roles.length === 0 && this.props.getRoles();
      teams.length === 0 && this.props.getTeams();
    }
  }

  render() {
    const { cities, users, roles, teams } = this.props.store;
    const { token } = this.props.store.token;

    return (
      <React.Fragment>
        {!token ? (
          <h1>Please login to gain access to this page!!!</h1>
        ) : (
          <div>
            <h1 className='display-5'>Cities</h1>
            <Link to='/cities/add'>
              <i
                style={{
                  cursor: "pointer",
                  color: "blue"
                }}
                readOnly
              >
                New City
              </i>
            </Link>
            {cities.length === 0 &&
            users.length === 0 &&
            roles.length === 0 &&
            teams.length === 0 ? (
              <React.Fragment>
                <h1>No cities, add the first one!!!</h1>
                <h1>No teams, add the first one!!!</h1>
                <p>
                  If you thinks this is a mistake, refresh the page and log back
                  in. Sorry, @_@
                </p>
                <button
                  onClick={() => this.actionAxios()}
                  className='btn btn-light '
                />
              </React.Fragment>
            ) : (
              cities.map((citiesElement, i) => (
                <div key={i}>
                  <City
                    id={citiesElement._id}
                    name={citiesElement.name}
                    address={citiesElement.address}
                    telephone={citiesElement.telephone}
                    usersId={citiesElement.users}
                  />
                </div>
              ))
            )}
          </div>
        )}
      </React.Fragment>
    );
  }
}

CitiesCards.propTypes = {
  store: PropTypes.object.isRequired,
  getCities: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
  getRoles: PropTypes.func.isRequired,
  getTeams: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  store: state
});

export default connect(
  mapStateToProps,
  { getCities, getUsers, getRoles, getTeams }
)(CitiesCards);
