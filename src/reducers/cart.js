import { SET_LOADING_CART, SET_CART, RESET_CART } from "../actions/cart";

const initialState = {
  loading: true,
  cart: [],
};

const cart = (state = initialState, action) => {
  switch (action.type) {
    case SET_CART:
      return {
        ...state,
        cart: action.payload,
      };

    case SET_LOADING_CART:
      return {
        ...state,
        loading: action.payload,
      };

    case RESET_CART:
      return initialState;

    default:
      return state;
  }
};

export default cart;
