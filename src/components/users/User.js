import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUser } from "../../actions/userActions";
import { updateCity } from "../../actions/cityActions";
import { updateIdea } from "../../actions/ideaActions";

import { updateTeam, deleteTeam } from "../../actions/teamActions";

class User extends Component {
  zeroUserTeam(userId) {
    const { teams, cities, ideas } = this.props.store;

    if (
      !teams.find(team => team.users.find(users => users.userId === userId)) &&
      !cities.find(city => city.users.find(user => user.id === userId))
    ) {
      this.props.deleteUser(userId);
    } else if (
      !!teams.find(team => team.users.find(users => users.userId === userId))
    ) {
      const { _id, name, cityId } = teams.find(team =>
        team.users.find(users => users.userId === userId)
      );
      const teamUsers = teams
        .find(team => team.users.find(users => users.userId === userId))
        .users.filter(user => user.userId !== userId);

      if (teamUsers.length > 0) {
        const updatedTeam = {
          _id: _id,
          name: name,
          cityId: cityId,
          users: teamUsers
        };
        this.props
          .updateTeam(_id, updatedTeam)
          .then(this.props.deleteUser(userId));
      } else {
        const { name: userName, surname: userSurname } = this.props;

        if (
          window.confirm(
            `${userName} ${userSurname} is the last member of ${name} team. All teams must have at least one member. If you delete ${userName} the team will be deleted as well. Do you want to proceed?`
          )
        ) {
          if (!!ideas.find(idea => idea.teamId === _id)) {
            const {
              _id: ideaId,
              name: ideaName,
              businessModelId: ideaBModel,
              description: ideaDescription
            } = ideas.find(idea => idea.teamId === _id);

            this.props
              .updateIdea(ideaId, {
                _id: ideaId,
                name: ideaName,
                businessModelId: ideaBModel,
                description: ideaDescription,
                teamId: ""
              })
              .then(this.props.deleteTeam(_id))
              .then(this.props.deleteUser(userId));
          } else {
            this.props.deleteTeam(_id).then(this.props.deleteUser(userId));
          }
        } else {
          return;
        }
      }
    } else if (
      !!cities.find(city => city.users.find(user => user.id === userId))
    ) {
      const { _id, name, address, telephone } = cities.find(city =>
        city.users.find(user => user.id === userId)
      );

      const cityUsers = cities
        .find(city => city.users.find(user => user.id === userId))
        .users.filter(user => user.id !== userId);

      const updatedCity = {
        _id: _id,
        name: name,
        address: address,
        telephone: telephone,
        users: cityUsers
      };
      this.props
        .updateCity(_id, updatedCity)
        .then(this.props.deleteUser(userId));
    } else {
      console.log(new Error("These case should never happen!!!"));
    }
  }

  render() {
    const { id, name, surname, email, telephone, roleId } = this.props;
    const { roles } = this.props.store;
    const roleName =
      (roles.find(role => role._id === roleId) &&
        roles.find(role => role._id === roleId).name) ||
      "Pending assignment";

    return (
      <tr>
        <td className={"users_info"}>{name}</td>
        <td className={"users_info"}>{surname}</td>
        <td className={"users_info"}>{email}</td>
        <td className={"users_info"}>{telephone}</td>
        <td className={"users_info"}>{roleName}</td>
        <td className={"users-info"}>
          <Link to={`users/edit/${id}`}>
            <i
              style={{
                cursor: "pointer",
                float: "right",
                color: "blue"
              }}
              readOnly
            >
              Update user
            </i>
          </Link>
        </td>
        <td className={"users-info"}>
          <i
            style={{ cursor: "pointer", textAlign: "right", color: "red" }}
            onClick={() => this.zeroUserTeam(id)}
          >
            Delete user
          </i>
        </td>
      </tr>
    );
  }
}

User.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  telephone: PropTypes.string.isRequired,
  roleId: PropTypes.string.isRequired,
  store: PropTypes.object.isRequired,
  deleteUser: PropTypes.func.isRequired,
  updateTeam: PropTypes.func.isRequired,
  deleteTeam: PropTypes.func.isRequired,
  updateCity: PropTypes.func.isRequired,
  updateIdea: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  store: state
});
export default connect(
  mapStateToProps,
  { deleteUser, updateTeam, deleteTeam, updateCity, updateIdea }
)(User);
