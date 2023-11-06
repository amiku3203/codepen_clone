const { createStore } = require("redux");
const { default: myReducer } = require("./reducers");

 const Store=createStore(myReducer)
 export default Store;