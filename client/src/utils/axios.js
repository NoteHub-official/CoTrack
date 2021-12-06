import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { store } from "../redux/store";
import { setAuthTokens, signOut } from "../redux/user/user.actions";

const axiosService = axios.create({
  baseURL: process.env.REACT_APP_API_URL_AUTH,
  headers: {
    "Content-Type": "application/json",
    Authorization: store.getState().user.currentUser
      ? store.getState().user.currentUser
      : null,
  },
});

export default axiosService;
