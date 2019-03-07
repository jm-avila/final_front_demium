import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteCity } from "../../actions/cityActions";
import { updateTeam } from "../../actions/teamActions";

class City extends Component {
  cleanTeams(cityId) {
    const { teams } = this.props.store;
    if (!!teams.find(team => team.cityId === cityId)) {
      teams
        .filter(team => team.cityId === cityId)
        .map((team, i) =>
          i === 0
            ? this.props
                .updateTeam(team._id, {
                  _id: team._id,
                  name: team.name,
                  cityId: "",
                  users: team.users
                })
                .then(this.props.deleteCity(cityId))
            : this.props.updateTeam(team._id, {
                _id: team._id,
                name: team.name,
                cityId: "",
                users: team.users
              })
        );
    } else {
      this.props.deleteCity(cityId);
    }
  }

  render() {
    const { users } = this.props.store;
    const { id, name, address, telephone, usersId } = this.props;
    return (
      <div className='card card-body mb-3'>
        <h4>{name}</h4>
        <ul className='list-group mb-1'>
          <li className='list-group-item'>
            <h5>Address:</h5> {address}
          </li>
          <li className='list-group-item'>
            <h5>Telephone:</h5> {telephone}
          </li>
          <li className='list-group-item'>
            <h5>Demium Users:</h5>
            {usersId.length === 0 ? (
              <p>No members at the location</p>
            ) : (
              usersId.map((userID, i) => (
                <p key={i}>
                  {users.find(usersElement => usersElement._id === userID.id)
                    ? `${
                        users.find(
                          usersElement => usersElement._id === userID.id
                        ).name
                      } ${
                        users.find(
                          usersElement => usersElement._id === userID.id
                        ).surname
                      }`
                    : "No match"}
                </p>
              ))
            )}
          </li>
        </ul>
        <Link to={`cities/edit/${id}`}>
          <i
            style={{
              cursor: "pointer",
              float: "right",
              color: "blue"
            }}
          >
            Update City
          </i>
        </Link>
        <i
          style={{ cursor: "pointer", textAlign: "right", color: "red" }}
          onClick={() => this.cleanTeams(id)}
        >
          Delete City
        </i>
      </div>
    );
  }
}

City.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  telephone: PropTypes.string.isRequired,
  usersId: PropTypes.array.isRequired,
  store: PropTypes.object.isRequired,
  deleteCity: PropTypes.func.isRequired,
  updateTeam: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  store: state
});

export default connect(
  mapStateToProps,
  { deleteCity, updateTeam }
)(City);
