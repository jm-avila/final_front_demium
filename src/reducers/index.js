import { combineReducers } from "redux";
import teamReducer from "./teamReducer";
import cityReducer from "./cityReducer";
import bModelReducer from "./businessModelReducer";
import ideaReducer from "./ideaReducer";
import roleReducer from "./roleReducer";
import userReducer from "./userReducer";
import loginReducer from "./loginReducers";

export default combineReducers({
  teams: teamReducer,
  cities: cityReducer,
  bModel: bModelReducer,
  ideas: ideaReducer,
  roles: roleReducer,
  users: userReducer,
  token: loginReducer
});
