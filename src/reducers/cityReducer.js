import {
  GET_CITIES,
  DELETE_CITY,
  UPDATE_CITY,
  ADD_CITY,
  SIGN_OUT
} from "../actions/types";

const defaultState = [];

const cityReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_CITIES:
      return action.payload;
    case UPDATE_CITY:
      return [
        ...state.filter(city => city._id !== action.payload.id),
        action.payload.updatedCity
      ];
    case ADD_CITY:
      return [...state, { _id: action.payload.id, ...action.payload.newCity }];
    case DELETE_CITY:
      return [...state.filter(city => city._id !== action.payload.id)];
    case SIGN_OUT:
      return [];
    default:
      return state;
  }
};

export default cityReducer;
