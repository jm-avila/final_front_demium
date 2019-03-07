import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteIdea } from "../../actions/ideaActions";

class Idea extends Component {
  render() {
    const { id, name, businessModelId, description, teamId } = this.props;
    const { bModel, teams } = this.props.store;

    return (
      <div className='card card-body mb-3'>
        <h4>{name}</h4>
        <ul className='list-group mb-1'>
          <li className='list-group-item'>
            <h5>Business Model:</h5>
            <p>
              {bModel.find(model => model._id === businessModelId) &&
                bModel.find(model => model._id === businessModelId).name}
            </p>
          </li>
          <li className='list-group-item'>
            <h5>Description:</h5>
            <p>{description}</p>
          </li>
          <li className='list-group-item'>
            <h5>Team:</h5>
            <p>
              {(teams.find(team => team._id === teamId) &&
                teams.find(team => team._id === teamId).name) ||
                "Available"}
            </p>
          </li>
        </ul>
        <Link to={`ideas/edit/${id}`}>
          <i
            style={{
              cursor: "pointer",
              float: "right",
              color: "blue"
            }}
            readOnly
          >
            Update Idea
          </i>
        </Link>
        <i
          style={{ cursor: "pointer", textAlign: "right", color: "red" }}
          onClick={() => this.props.deleteIdea(id)}
        >
          Delete Idea
        </i>
      </div>
    );
  }
}

Idea.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  businessModelId: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  teamId: PropTypes.string.isRequired,
  store: PropTypes.object.isRequired,
  deleteIdea: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  store: state
});

export default connect(
  mapStateToProps,
  { deleteIdea }
)(Idea);
