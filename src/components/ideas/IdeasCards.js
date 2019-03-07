import React, { Component } from "react";
import Idea from "./Idea";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getIdeas } from "../../actions/ideaActions";
import { getBModel } from "../../actions/businessModelActions";
import { getTeams } from "../../actions/teamActions";

class IdeasCards extends Component {
  componentDidMount() {
    const { ideas, bModel, teams } = this.props.store;
    const { token } = this.props.store.token;
    if (token) {
      bModel.length === 0 && this.props.getBModel();
      teams.length === 0 && this.props.getTeams();
      ideas.length === 0 && this.props.getIdeas();
    }
  }

  actionAxios() {
    const { ideas, bModel, teams } = this.props.store;
    const { token } = this.props.store.token;
    if (token) {
      bModel.length === 0 && this.props.getBModel();
      teams.length === 0 && this.props.getTeams();
      ideas.length === 0 && this.props.getIdeas();
    }
  }

  render() {
    const { ideas, bModel, teams } = this.props.store;
    const { token } = this.props.store.token;

    return (
      <React.Fragment>
        {!token ? (
          <h1>Please login to gain access to this page!!!</h1>
        ) : (
          <div>
            <h1 className='display-5'>Ideas</h1>
            <Link to='/ideas/add'>
              <i
                style={{
                  cursor: "pointer",
                  color: "blue"
                }}
                readOnly
              >
                New idea
              </i>
            </Link>
            {ideas.length === 0 && bModel.length === 0 && teams.length === 0 ? (
              <React.Fragment>
                <h1>No ideas, add the first one!!!</h1>
                <h1>No teams, add the first one!!!</h1>
                <p>
                  If you thinks this is a mistake, refresh the page and log back
                  in. Sorry, @_@
                </p>
              </React.Fragment>
            ) : (
              ideas.map((idea, i) => (
                <div key={i}>
                  <Idea
                    id={idea._id}
                    name={idea.name}
                    description={idea.description}
                    businessModelId={idea.businessModelId}
                    teamId={idea.teamId}
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

IdeasCards.propTypes = {
  store: PropTypes.object.isRequired,
  getIdeas: PropTypes.func.isRequired,
  getBModel: PropTypes.func.isRequired,
  getTeams: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  store: state
});

export default connect(
  mapStateToProps,
  { getIdeas, getBModel, getTeams }
)(IdeasCards);
