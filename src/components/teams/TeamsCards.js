import React, { Component } from "react";
import Team from "./Team";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getTeams } from "../../actions/teamActions";
import { getIdeas } from "../../actions/ideaActions";
import { getCities } from "../../actions/cityActions";
import { getUsers } from "../../actions/userActions";
import { getRoles } from "../../actions/roleActions";

class TeamsCards extends Component {
  componentDidMount() {
    const { teams, ideas, cities, users, roles } = this.props.store;
    const { token } = this.props.store.token;
    if (token) {
      cities.length === 0 && this.props.getCities();
      users.length === 0 && this.props.getUsers();
      roles.length === 0 && this.props.getRoles();
      teams.length === 0 && this.props.getTeams();
      ideas.length === 0 && this.props.getIdeas();
    }
  }

  actionAxios() {
    const { teams, ideas, cities, users, roles } = this.props.store;
    const { token } = this.props.store.token;
    if (token) {
      cities.length === 0 && this.props.getCities();
      users.length === 0 && this.props.getUsers();
      roles.length === 0 && this.props.getRoles();
      teams.length === 0 && this.props.getTeams();
      ideas.length === 0 && this.props.getIdeas();
    }
  }

  render() {
    const { teams, ideas, cities, users, roles } = this.props.store;
    const { token } = this.props.store.token;

    return (
      <React.Fragment>
        {!token ? (
          <h1>Please login to gain access to this page!!!</h1>
        ) : (
          <div>
            <h1 className='display-5'>Teams</h1>
            <Link to='/teams/add'>
              <i
                style={{
                  cursor: "pointer",
                  color: "blue"
                }}
              >
                New team
              </i>
            </Link>
            {teams.length === 0 &&
            cities.length === 0 &&
            ideas.length === 0 &&
            users.length === 0 &&
            roles.length === 0 ? (
              <React.Fragment>
                <h1>No teams, add the first one!!!</h1>
                <p>
                  If you thinks this is a mistake, refresh the page and log back
                  in. Sorry, @_@
                </p>
              </React.Fragment>
            ) : (
              teams.map((team, i) => (
                <div key={i}>
                  <Team
                    id={team._id}
                    name={team.name}
                    cityId={team.cityId}
                    usersId={team.users}
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

TeamsCards.propTypes = {
  store: PropTypes.object.isRequired,
  getTeams: PropTypes.func.isRequired,
  getIdeas: PropTypes.func.isRequired,
  getCities: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
  getRoles: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  store: state
});

export default connect(
  mapStateToProps,
  { getTeams, getIdeas, getCities, getUsers, getRoles }
)(TeamsCards);
