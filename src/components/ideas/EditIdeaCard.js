import React, { Component } from "react";
import TextInputGroup from "../layout/TextInputGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateIdea } from "../../actions/ideaActions";
import axios from "axios";
import token from "../../actions/loginActions";
import { Link } from "react-router-dom";
import { URL } from "../../actions/URL";

class EditIdeaCard extends Component {
  state = {
    name: "",
    businessModelId: "",
    description: "",
    teamId: "",
    nameError: false
  };

  componentDidMount() {
    const getIdea = async () => {
      const { id } = this.props.match.params;
      const res = await axios
        .get(`${URL}idea/${id}`, {
          headers: { Authorization: token }
        })
        .catch(err => console.log("Failed connection", err));
      const { name, businessModelId, description, teamId } = res.data;
      this.setState({
        name,
        businessModelId,
        description,
        teamId
      });
    };
    getIdea();
  }

  onSubmit = evnt => {
    evnt.preventDefault();

    const { name, businessModelId, description, teamId } = this.state;

    if (name.length === 0) {
      alert("Name is a mandatory field!");
      return;
    }

    if (description.length === 0) {
      alert("Description is a mandatory field!");
      return;
    }

    if (businessModelId === "No bModel") {
      alert("Business Model if a mandatory field!");
      return;
    }

    let updatedIdea;
    if (teamId === "") {
      alert("Choose a team or free the idea!");
      return;
    } else if (teamId === "No team") {
      updatedIdea = {
        name,
        businessModelId,
        description
      };
    } else {
      updatedIdea = {
        name,
        businessModelId,
        description,
        teamId
      };
    }

    const { id } = this.props.match.params;

    this.props.updateIdea(id, updatedIdea);

    this.props.history.push("/ideas");
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

  render() {
    const { teams, bModel, ideas } = this.props.store;
    const { token } = this.props.store.token;
    const { name, description, businessModelId, teamId } = this.state;

    return (
      <React.Fragment>
        {!token ? (
          <h1>Please login to gain access to this page!!!</h1>
        ) : (
          <div className='card mb-3'>
            <div className='card-header'>
              <h1>Update Idea</h1>
            </div>
            <form onSubmit={this.onSubmit}>
              <div className='card card-body mb-3'>
                <ul className='list-group mb-1'>
                  <li className='list-group-item'>
                    <h5>Name:</h5>
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
                    <h5>Business Model:</h5>
                    <select name='businessModelId' onChange={this.onNewData}>
                      <option value='No bModel'>Choose a business model</option>
                      {bModel.map((model, i) => (
                        <option key={i} value={model._id}>
                          {model.name}
                        </option>
                      ))}
                    </select>
                    <p>
                      Current business model:{" "}
                      {bModel.find(model => model._id === businessModelId)
                        ? bModel.find(model => model._id === businessModelId)
                            .name
                        : "No business model"}
                    </p>
                  </li>
                  <li className='list-group-item'>
                    <h5>Description</h5>
                    <TextInputGroup
                      name='description'
                      value={description}
                      placeholder={description}
                      onChange={this.onNewData}
                    />
                  </li>
                  <li className='list-group-item'>
                    <h5>Team:</h5>
                    <select name='teamId' onChange={this.onNewData}>
                      <option value={""}>Choose a Team</option>
                      {teams
                        .filter(
                          team => !ideas.find(idea => idea.teamId === team._id)
                        )
                        .map((team, i) => (
                          <option key={i} value={team._id}>
                            {team.name}
                          </option>
                        ))}
                      <option value='No team'>Choose to free the Idea</option>
                    </select>
                    <p>
                      Current team:{" "}
                      {teams.find(team => team._id === teamId)
                        ? teams.find(team => team._id === teamId).name
                        : "No team"}
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
              <Link to={`/ideas`}>
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
  updateIdea: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  store: state
});

export default connect(
  mapStateToProps,
  { updateIdea }
)(EditIdeaCard);
