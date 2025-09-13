import {combineReducers} from "redux";
import stateReducer from "./stateReducers";

const rootReducer = combineReducers({
    state: stateReducer
});

export default rootReducer;