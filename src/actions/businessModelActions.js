import { GET_BMODEL } from "./types";
import axios from "axios";
import token from "./loginActions";
import { URL } from "./URL";

export const getBModel = () => async dispatch => {
  await axios
    .get(`${URL}businessmodel`, {
      headers: { Authorization: token }
    })
    .then(res => {
      dispatch({
        type: GET_BMODEL,
        payload: res.data.data
      });
    })
    .catch(err => console.log("Failed connection", err));
};
