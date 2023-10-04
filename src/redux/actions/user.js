export const SET_USER_FULL_NAME = "SET_USER_FULL_NAME";
export const SET_USER_PHONE = "SET_USER_PHONE";
export const SET_USER_EMAIL = "SET_USER_EMAIL";
export const SET_USER_ROLE = "SET_USER_ROLE";
export const SET_USER_TOKEN = "SET_USER_TOKEN";
export const RESET_USER = "RESET_USER";

export const setUserFullName = (names) => (dispatch) => {
  dispatch({
    type: SET_USER_FULL_NAME,
    payload: names,
  });
};

export const setUserPhone = (phone) => (dispatch) => {
  dispatch({
    type: SET_USER_PHONE,
    payload: phone,
  });
};

export const setUserRole = (role) => (dispatch) => {
  dispatch({
    type: SET_USER_ROLE,
    payload: role,
  });
};

export const setUserEmail = (email) => (dispatch) => {
  dispatch({
    type: SET_USER_EMAIL,
    payload: email,
  });
};

export const setUserToken = (token) => (dispatch) => {
  dispatch({
    type: SET_USER_TOKEN,
    payload: token,
  });
};

export const resetUser = () => ({ type: RESET_USER });
