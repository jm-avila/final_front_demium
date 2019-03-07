import axios from "axios";
import { URL } from "./URL";
import {
  ADD_TOKEN,
  AUTH_ERROR,
  CLEAR_ERROR,
  NEW_ACCOUNT,
  SIGN_OUT
} from "./types";

let localToken = window.localStorage;

export const postlogin = authData => async dispatch => {
  await axios
    .post(`${URL}authentication/`, authData)
    .then(res => {
      let accessToken = res.data;
      console.log("res.data", res.data);
      accessToken = accessToken.accessToken;
      localToken.setItem("accessToken", accessToken);
      console.log("accessToken", accessToken);
      dispatch({
        type: ADD_TOKEN,
        payload: { token: true, error: false }
      });
    })
    .catch(err => {
      dispatch({
        type: AUTH_ERROR,
        payload: { token: false, error: true }
      });
    });
};
const token = localToken.getItem("accessToken");

export const postregister = authData => async dispatch => {
  await axios
    .post(`${URL}auth-users/`, authData)
    .then(res => {
      dispatch({
        type: NEW_ACCOUNT,
        payload: { account: true, token: false, error: false }
      });
    })
    .catch(() => {
      dispatch({
        type: AUTH_ERROR,
        payload: { token: false, error: true }
      });
    });
};

export const signOut = () => dispatch => {
  dispatch({
    type: SIGN_OUT,
    payload: false
  });
  window.localStorage.clear();
};

export const clearError = () => dispatch => {
  dispatch({
    type: CLEAR_ERROR,
    payload: { error: false, account: false }
  });
};

export default token;
