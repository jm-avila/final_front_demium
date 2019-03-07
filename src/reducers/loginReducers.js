import {
  ADD_TOKEN,
  AUTH_ERROR,
  CLEAR_ERROR,
  NEW_ACCOUNT,
  SIGN_OUT
} from "../actions/types";

const defaultState = { token: false, error: false, account: false };

const loginReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_TOKEN:
      return { ...state, ...action.payload };
    case SIGN_OUT:
      return { ...state, token: action.payload };
    case NEW_ACCOUNT:
      return { ...action.payload };
    case AUTH_ERROR:
      return { ...state, ...action.payload };
    case CLEAR_ERROR:
      return {
        error: action.payload.error,
        token: action.payload.token,
        account: action.payload.account
      };

    default:
      return state;
  }
};

export default loginReducer;
