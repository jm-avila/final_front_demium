import { GET_BMODEL, SIGN_OUT } from "../actions/types";

const defaultState = [];

const bModelReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_BMODEL:
      return action.payload;
    case SIGN_OUT:
      return [];
    default:
      return state;
  }
};

export default bModelReducer;
