import { combineReducers } from "redux";
import authReducer         from "./auth.reducer";
import relationReducer     from "./relation.reducer";
import userReducer         from "./user.reducer";

const rootReducer = combineReducers({
    auth    : authReducer,
    user    : userReducer,
    relation: relationReducer
});

export default rootReducer;