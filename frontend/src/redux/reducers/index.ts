import { combineReducers } from "redux";

import { authReducer as auth } from "../auth";

export const rootReducers = combineReducers({
  auth,
});
