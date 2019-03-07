import { GET_IDEAS, DELETE_IDEA, UPDATE_IDEA, ADD_IDEAS } from "./types";
import axios from "axios";
import token from "./loginActions";
import { URL } from "./URL";

export const getIdeas = () => async dispatch => {
  await axios
    .get(`${URL}idea`, {
      headers: { Authorization: token }
    })
    .then(res => {
      console.log("GET_IDEAS", res.data.data);
      dispatch({
        type: GET_IDEAS,
        payload: res.data.data
      });
    })
    .catch(err => console.log("Failed connection", err));
};

export const postIdea = newIdea => async dispatch => {
  await axios
    .post(`${URL}idea`, newIdea, {
      headers: { Authorization: token }
    })
    .then(res => {
      dispatch({ type: ADD_IDEAS, payload: { newIdea, id: res.data._id } });
    })
    .catch(err => console.log("Failed connection", err));
};

export const deleteIdea = id => async dispatch => {
  await axios
    .delete(`${URL}idea/${id}`, {
      headers: { Authorization: token }
    })
    .then(dispatch({ type: DELETE_IDEA, payload: { id } }))
    .catch(err => console.log("Failed connection", err));
};

export const updateIdea = (id, updatedIdea) => async dispatch => {
  await axios
    .put(`${URL}idea/${id}`, updatedIdea, {
      headers: { Authorization: token }
    })
    .then(res => {
      console.log(res);
      dispatch({ type: UPDATE_IDEA, payload: { updatedIdea, id } });
    })
    .catch(err => console.log("Failed connection", err));
};
