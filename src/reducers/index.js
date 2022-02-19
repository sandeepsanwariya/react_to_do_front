import changeThemeState from "./ThemeState";
import changeLogState from "./LogState";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    changeLogState,
    changeThemeState,
 
})
export default rootReducer