import { UserActionTypes } from "./user.types";
import axios from "axios";

export const signInSuccess = (user) => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload: user,
});

export const signInFailure = (error) => ({
  type: UserActionTypes.SIGN_IN_FAILURE,
  payload: error,
});

export const signOut = () => ({
  type: UserActionTypes.SIGN_OUT,
});

export const checkUserSession = () => ({
  type: UserActionTypes.CHECK_USER_SESSION,
});

export const setAuthTokens = (tokenAndRefresh) => ({
  type: UserActionTypes.SET_AUTH_TOKEN,
  payload: tokenAndRefresh,
});

export const signInAsync = (username, password) => {
  return (dispatch) => {
    axios
      .post(`${process.env.REACT_APP_API_URL_AUTH}/jwt/create/`, {
        username,
        password,
      })
      .then((res) => {
        dispatch(signInSuccess(res.data));
      })
      .catch((err) => {
        dispatch(signInFailure(err.message));
      });
  };
};

export const resetPasswordInAsync = (password, newPassword, access) => {
  return (dispatch) => {
    console.log(access);
    axios.post(
      `${process.env.REACT_APP_API_URL_AUTH}/users/set_password/`,
      {
        current_password: password,
        new_password: newPassword,
      },
      {
        headers: {
          Authorization: `JWT ${access}`,
        },
      }
    );
  };
};
