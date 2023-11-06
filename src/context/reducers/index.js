import projectReducer from "./projectReducer";
import searchReducer from "./searchReducer"
const { combineReducers } = require("redux");
const { default: userAuthReducer } = require("./userAuthReducer");

const myReducer=combineReducers({
     user:userAuthReducer,
     projects:projectReducer,
     searchTerm: searchReducer
})

export default myReducer;