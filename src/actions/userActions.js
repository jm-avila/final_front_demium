import { GET_USERS, DELETE_USER, UPDATE_USER, ADD_USERS } from "./types";
import axios from "axios";
import token from "./loginActions";
import { URL } from "./URL";

export const getUsers = () => async dispatch => {
  await axios
    .get(`${URL}user`, {
      headers: { Authorization: token }
    })
    .then(res => {
      dispatch({
        type: GET_USERS,
        payload: res.data.data
      });
    })
    .catch(err => console.log("Failed connection", err));
};

export const postUser = newUser => async dispatch => {
  await axios
    .post(`${URL}user`, newUser, {
      headers: { Authorization: token }
    })
    .then(res => {
      dispatch({
        type: ADD_USERS,
        payload: { newUser, id: res.data._id }
      });
    })
    .catch(err => console.log("Failed connection", err));
};

export const deleteUser = id => async dispatch => {
  await axios
    .delete(`${URL}user/${id}`, {
      headers: { Authorization: token }
    })
    .then(dispatch({ type: DELETE_USER, payload: { id } }))
    .catch(err => console.log("Failed connection", err));
};

export const updateUser = (id, updatedUser) => async dispatch => {
  await axios
    .put(`${URL}user/${id}`, updatedUser, {
      headers: { Authorization: token }
    })
    .then(res => {
      console.log(res);
      dispatch({ type: UPDATE_USER, payload: { updatedUser, _id: id } });
    })
    .catch(err => console.log("Failed connection", err));
};
