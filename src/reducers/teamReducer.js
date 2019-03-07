import {
  GET_TEAMS,
  DELETE_TEAM,
  UPDATE_TEAM,
  ADD_TEAMS,
  SIGN_OUT
} from "../actions/types";

const defaultState = [];

const teamReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_TEAMS:
      return action.payload;
    case UPDATE_TEAM:
      return [
        ...state.filter(team => team._id !== action.payload.id),
        { _id: action.payload.id, ...action.payload.updatedTeam }
      ];
    case ADD_TEAMS:
      return [...state, { _id: action.payload.id, ...action.payload.newTeam }];
    case DELETE_TEAM:
      return [...state.filter(team => team._id !== action.payload.id)];
    case SIGN_OUT:
      return [];
    default:
      return state;
  }
};

export default teamReducer;
