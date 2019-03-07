import {
  GET_IDEAS,
  DELETE_IDEA,
  UPDATE_IDEA,
  ADD_IDEAS,
  SIGN_OUT
} from "../actions/types";

const defaultState = [];

const ideaReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_IDEAS:
      return action.payload;
    case UPDATE_IDEA:
      return [
        ...state.filter(idea => idea._id !== action.payload.id),
        { _id: action.payload.id, ...action.payload.updatedIdea }
      ];
    case ADD_IDEAS:
      return [...state, { _id: action.payload.id, ...action.payload.newIdea }];
    case DELETE_IDEA:
      return [...state.filter(idea => idea._id !== action.payload.id)];
    case SIGN_OUT:
      return [];
    default:
      return state;
  }
};

export default ideaReducer;
