import Axios from "axios";
import { app } from "../../constants";
import { errorHandler } from "../../helpers";
export const SET_LOADING_PRODUCTS = "SET_LOADING_PRODUCTS";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const setProducts = (prods) => (dispatch) => {
  dispatch({
    type: SET_PRODUCTS,
    payload: prods,
  });
};

export const setLoadingProducts = (value) => (dispatch) => {
  dispatch({
    type: SET_LOADING_PRODUCTS,
    payload: value,
  });
};

export const fetchProducts = () => (dispatch, getState) => {
  dispatch(setLoadingProducts(true));
  Axios.get(app.BACKEND_URL + "/products/")
    .then((res) => {
      setTimeout(() => {
        dispatch(setLoadingProducts(false));
        dispatch(setProducts(res.data.products));
      }, 1000);
    })
    .catch((error) => {
      setTimeout(() => {
        dispatch(setLoadingProducts(false));
        errorHandler(error);
      }, 1000);
    });
};
