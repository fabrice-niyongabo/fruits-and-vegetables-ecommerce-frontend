import {
  SET_LOADING_CART,
  SET_CART,
  RESET_CART,
  SET_CART_FACILITY_MANAGER_ID,
  SET_CART_FACILITY_NAME,
} from "../actions/cart";

const initialState = {
  loading: true,
  cart: [],
  facilityName: "",
  managerId: "",
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

    case SET_CART_FACILITY_MANAGER_ID:
      return {
        ...state,
        managerId: action.payload,
      };
    case SET_CART_FACILITY_NAME:
      return {
        ...state,
        facilityName: action.payload,
      };

    case RESET_CART:
      return {
        loading: true,
        cart: [],
        facilityName: "",
        managerId: "",
      };

    default:
      return state;
  }
};

export default cart;
