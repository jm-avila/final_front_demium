import { GET_ROLES } from "./types";
import axios from "axios";
import token from "./loginActions";
import { URL } from "./URL";

export const getRoles = () => async dispatch => {
  await axios
    .get(`${URL}role`, {
      headers: { Authorization: token }
    })
    .then(res => {
      console.log("GET_ROLES", res.data.data);

      dispatch({
        type: GET_ROLES,
        payload: res.data.data
      });
    })
    .catch(err => console.log("Failed connection", err));
};
