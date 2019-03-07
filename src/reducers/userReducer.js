import {
  GET_USERS,
  DELETE_USER,
  UPDATE_USER,
  ADD_USERS,
  SIGN_OUT
} from "../actions/types";
const defaultState = [];

const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_USERS:
      return action.payload;
    case UPDATE_USER:
      return [
        ...state.filter(city => city._id !== action.payload._id),
        action.payload.updatedUser
      ];
    case ADD_USERS:
      console.log("_id", action.payload.id);
      return [...state, { _id: action.payload.id, ...action.payload.newUser }];
    case DELETE_USER:
      return [...state.filter(city => city._id !== action.payload.id)];
    case SIGN_OUT:
      return [];
    default:
      return state;
  }
};

export default userReducer;
