import { GET_TEAMS, DELETE_TEAM, UPDATE_TEAM, ADD_TEAMS } from "./types";
import axios from "axios";
import token from "./loginActions";
import { URL } from "./URL";

export const getTeams = () => async dispatch => {
  await axios
    .get(`${URL}team`, {
      headers: { Authorization: token }
    })
    .then(res => {
      console.log("GET_TEAMS", res.data.data);

      dispatch({
        type: GET_TEAMS,
        payload: res.data.data
      });
    })
    .catch(err => console.log("Failed connection", err));
};

export const postTeam = newTeam => async dispatch => {
  await axios
    .post(`${URL}team`, newTeam, {
      headers: { Authorization: token }
    })
    .then(res => {
      dispatch({ type: ADD_TEAMS, payload: { newTeam, id: res.data._id } });
    })
    .catch(err => console.log("Failed connection", err));
};

export const deleteTeam = id => async dispatch => {
  await axios
    .delete(`${URL}team/${id}`, {
      headers: { Authorization: token }
    })
    .then(dispatch({ type: DELETE_TEAM, payload: { id } }))
    .catch(err => console.log("Failed connection", err));
};

export const updateTeam = (id, updatedTeam) => async dispatch => {
  await axios
    .put(`${URL}team/${id}`, updatedTeam, {
      headers: { Authorization: token }
    })
    .then(res => {
      console.log(res);
      dispatch({ type: UPDATE_TEAM, payload: { updatedTeam, id } });
    })
    .catch(err => console.log("Failed connection", err));
};
