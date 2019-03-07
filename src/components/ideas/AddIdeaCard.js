import React, { Component } from "react";
import TextInputGroup from "../layout/TextInputGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { postIdea } from "../../actions/ideaActions";
import { Link } from "react-router-dom";

class AddIdeaCard extends Component {
  state = {
    name: "",
    businessModelId: "No Model",
    description: "",
    teamId: "No Team",
    nameError: false
  };

  onSubmit = evnt => {
    evnt.preventDefault();

    const { name, businessModelId, description, teamId } = this.state;

    if (name.length === 0) {
      alert("Name is a mandatory field!");
      return;
    }

    if (businessModelId === "No Model") {
      alert("Business Model is a mandatory field!");
      return;
    }

    if (description.length === 0) {
      alert("Description is a mandatory field!");
      return;
    }

    let newIdea;

    if (teamId === "") {
      newIdea = {
        name,
        businessModelId,
        description
      };
    } else {
      newIdea = {
        name,
        businessModelId,
        description,
        teamId
      };
    }

    this.props.postIdea(newIdea);

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

    const { name } = this.state;

    return (
      <React.Fragment>
        {!token ? (
          <h1>Please login to gain access to this page!!!</h1>
        ) : (
          <div className='card mb-3'>
            <div className='card-header'>
              <h1>Add Idea</h1>
            </div>
            <form onSubmit={this.onSubmit}>
              <div className='card card-body mb-3'>
                <ul className='list-group mb-1'>
                  <li className='list-group-item'>
                    <h5>Name:</h5>
                    <TextInputGroup
                      name='name'
                      value={name}
                      placeholder='Enter the ideas name'
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
                      <option value='No Model'>Choose a Business Model</option>
                      {bModel.map((model, i) => (
                        <option key={i} value={model._id}>
                          {model.name}
                        </option>
                      ))}
                    </select>
                  </li>
                  <li className='list-group-item'>
                    <h5>Description</h5>
                    <TextInputGroup
                      name='description'
                      placeholder='Enter a description'
                      onChange={this.onNewData}
                    />
                  </li>
                  <li className='list-group-item'>
                    <h5>Team:</h5>
                    <select name='teamId' onChange={this.onNewData}>
                      <option value='No Team'>Choose a Team</option>
                      {teams
                        .filter(
                          team => !ideas.find(idea => idea.teamId === team._id)
                        )
                        .map((team, i) => (
                          <option key={i} value={team._id}>
                            {team.name}
                          </option>
                        ))}
                    </select>
                  </li>
                </ul>
              </div>
              <input
                type='submit'
                value='Add'
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

AddIdeaCard.propTypes = {
  store: PropTypes.object.isRequired,
  postIdea: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  store: state
});

export default connect(
  mapStateToProps,
  { postIdea }
)(AddIdeaCard);
