import Axios from "axios";
import { handleAuthError } from "../../helpers";
export const RESET_CART = "RESET_CART";
export const SET_LOADING_CART = "SET_LOADING_CART";
export const SET_CART = "SET_CART";
export const SET_CART_FACILITY_NAME = "SET_CART_FACILITY_NAME";
export const SET_CART_FACILITY_MANAGER_ID = "SET_CART_FACILITY_MANAGER_ID";

export const setCart = (cart) => (dispatch) => {
  dispatch({
    type: SET_CART,
    payload: cart,
  });
};

export const resetCart = () => (dispatch) => {
  dispatch({
    type: RESET_CART,
  });
};

export const setLoadingCart = (value) => (dispatch) => {
  dispatch({
    type: SET_LOADING_CART,
    payload: value,
  });
};

export const fetchCart = () => (dispatch, getState) => {
  dispatch(setLoadingCart(true));
  let endPoint;
  const { token } = getState().user;
  if (!token || token.trim() === "") {
    endPoint = process.env.REACT_APP_BACKEND_URL + "/cart/";
  } else {
    endPoint = process.env.REACT_APP_BACKEND_URL + "/cart/?token=" + token;
  }
  Axios.get(endPoint)
    .then((res) => {
      dispatch(setLoadingCart(false));
      dispatch(setCart(res.data.result));
    })
    .catch((error) => {
      dispatch(setLoadingCart(false));
      handleAuthError(error);
    });
};
