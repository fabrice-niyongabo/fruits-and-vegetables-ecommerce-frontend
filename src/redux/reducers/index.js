import { combineReducers } from "redux";
import user from "./user";
import cart from "./cart";
import products from "./products";
import categories from "./categories";

const rootReducer = combineReducers({
  user,
  cart,
  products,
  categories,
});

export default rootReducer;
