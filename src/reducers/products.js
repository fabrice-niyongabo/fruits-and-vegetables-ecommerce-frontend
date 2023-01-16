import { SET_LOADING_PRODUCTS, SET_PRODUCTS } from "../actions/products";

const initialState = {
  loading: true,
  products: [],
};

const products = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };

    case SET_LOADING_PRODUCTS:
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
};

export default products;
