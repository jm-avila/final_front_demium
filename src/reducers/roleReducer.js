import { GET_ROLES, SIGN_OUT } from "../actions/types";

const defaultState = [];

const roleReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_ROLES:
      return action.payload;
    case SIGN_OUT:
      return [];
    default:
      return state;
  }
};

export default roleReducer;
