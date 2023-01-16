import { SET_LOADING_CATEGORIES, SET_CATEGORIES } from "../actions/categories";

const initialState = {
  loading: true,
  categories: [],
};

const categories = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };

    case SET_LOADING_CATEGORIES:
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
};

export default categories;
