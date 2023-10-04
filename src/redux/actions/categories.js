import Axios from "axios";
import { app } from "../../constants";
import { errorHandler } from "../../helpers";
export const SET_LOADING_CATEGORIES = "SET_LOADING_CATEGORIES";
export const SET_CATEGORIES = "SET_CATEGORIES";

export const setCategories = (prods) => (dispatch) => {
  dispatch({
    type: SET_CATEGORIES,
    payload: prods,
  });
};

export const setLoadingCategories = (value) => (dispatch) => {
  dispatch({
    type: SET_LOADING_CATEGORIES,
    payload: value,
  });
};

export const fetchCategories = () => (dispatch, getState) => {
  dispatch(setLoadingCategories(true));
  Axios.get(app.BACKEND_URL + "/categories/")
    .then((res) => {
      dispatch(setLoadingCategories(false));
      dispatch(setCategories(res.data.categories));
    })
    .catch((error) => {
      dispatch(setLoadingCategories(false));
      errorHandler(error);
    });
};
