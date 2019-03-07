import { GET_CITIES, DELETE_CITY, UPDATE_CITY, ADD_CITY } from "./types";
import axios from "axios";
import token from "./loginActions";
import { URL } from "./URL";

export const getCities = () => async dispatch => {
  await axios
    .get(`${URL}city`, {
      headers: { Authorization: token }
    })
    .then(res => {
      console.log("GET_CITIES", res.data.data);

      dispatch({
        type: GET_CITIES,
        payload: res.data.data
      });
    })
    .catch(err => console.log("Failed connection", err));
};

export const postCity = newCity => async dispatch => {
  await axios
    .post(`${URL}city`, newCity, {
      headers: { Authorization: token }
    })
    .then(res => {
      dispatch({ type: ADD_CITY, payload: { newCity, id: res.data._id } });
    })
    .catch(err => console.log("Failed connection", err));
};

export const deleteCity = id => async dispatch => {
  await axios
    .delete(`${URL}city/${id}`, {
      headers: { Authorization: token }
    })
    .then(dispatch({ type: DELETE_CITY, payload: { id } }))
    .catch(err => console.log("Failed connection", err));
};

export const updateCity = (id, updatedCity) => async dispatch => {
  await axios
    .put(`${URL}city/${id}`, updatedCity, {
      headers: { Authorization: token }
    })
    .then(res => {
      console.log(res);
      dispatch({ type: UPDATE_CITY, payload: { updatedCity, id } });
    })
    .catch(err => console.log("Failed connection", err));
};
