import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteTeam } from "../../actions/teamActions";
import { updateIdea } from "../../actions/ideaActions";

class Team extends Component {
  cleanIdea(teamId) {
    const { ideas } = this.props.store;

    if (!!ideas.find(idea => idea.teamId === teamId)) {
      const { _id, name, businessModelId, description } = ideas.find(
        idea => idea.teamId === teamId
      );

      this.props
        .updateIdea(_id, {
          name,
          businessModelId,
          description,
          teamId: ""
        })
        .then(this.props.deleteTeam(teamId));
    } else {
      this.props.deleteTeam(teamId);
    }
  }

  render() {
    const { users, cities, ideas } = this.props.store;
    const { id, name, cityId, usersId } = this.props;
    const cityUsersId =
      cities.find(city => city._id === cityId) &&
      cities.find(city => city._id === cityId)._id;

    return (
      <div className='card card-body mb-3'>
        <h4>{name}</h4>
        <ul className='list-group mb-1'>
          <li className='list-group-item'>
            <p>
              {`Idea: 
              ${
                ideas.find(idea => idea.teamId === id)
                  ? ideas.find(idea => idea.teamId === id).name
                  : "Pending Idea"
              }`}
            </p>
          </li>
          <li className='list-group-item'>
            {`City:
            ${
              cities.find(city => city._id === cityId)
                ? cities.find(city => city._id === cityId).name
                : "Pending City"
            }`}
          </li>
        </ul>
        <h4>Demium members</h4>
        <ul className='list-group mb-1'>
          <li className='list-group-item'>
            <p>Members:</p>
            {cities.find(city => city._id === cityUsersId)
              ? cities
                  .find(city => city._id === cityUsersId)
                  .users.map((userID, i) => (
                    <p key={i}>
                      {users.find(
                        usersElement => usersElement._id === userID.id
                      )
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
              : "No members at the location"}{" "}
          </li>
        </ul>

        <h4>Team members</h4>
        <ul className='list-group mb-1'>
          <li className='list-group-item'>
            {users.length === 0
              ? "There should be no teams without members"
              : usersId.map((userID, i) => (
                  <p key={i}>
                    {users.find(
                      usersElement => usersElement._id === userID.userId
                    )
                      ? `${
                          users.find(
                            usersElement => usersElement._id === userID.userId
                          ).name
                        } ${
                          users.find(
                            usersElement => usersElement._id === userID.userId
                          ).surname
                        }`
                      : "No match"}
                  </p>
                ))}
          </li>
        </ul>

        <Link to={`teams/edit/${id}`}>
          <i
            style={{
              cursor: "pointer",
              float: "right",
              color: "blue"
            }}
          >
            Update Team
          </i>
        </Link>
        <i
          style={{ cursor: "pointer", textAlign: "right", color: "red" }}
          onClick={() => this.cleanIdea(id)}
        >
          Delete Team
        </i>
      </div>
    );
  }
}

Team.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  cityId: PropTypes.string.isRequired,
  usersId: PropTypes.array.isRequired,
  store: PropTypes.object.isRequired,
  deleteTeam: PropTypes.func.isRequired,
  updateIdea: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  store: state
});

export default connect(
  mapStateToProps,
  { deleteTeam, updateIdea }
)(Team);
