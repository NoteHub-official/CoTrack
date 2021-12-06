import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { store } from "../redux/store";
import { setAuthTokens, signOut } from "../redux/user/user.actions";
const axiosService = axios.create({
  baseURL: process.env.REACT_APP_API_URL_AUTH,
  headers: {
    "Content-Type": "application/json",
  },
});

axios.interceptors.request.use((request) => {
  const { access } = store.getState().user.currentUser;
  request.headers["Authorization"] = `Bearer ${access}`;
  return request;
});

const refreshAuthLogic = async (failedRequest) => {
  const { refresh } = store.getState().user.currentUser;
  if (refresh !== null) {
    return axios
      .post(
        "/auth/refresh/",
        {
          refresh: refresh,
        },
        {
          baseURL: process.env.REACT_APP_API_URL_AUTH,
        }
      )
      .then((resp) => {
        const { access, refresh } = resp.data;
        failedRequest.response.config.headers.Authorization =
          "Bearer " + access;
        store.dispatch(
          setAuthTokens({
            access,
            refresh,
          })
        );
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          store.dispatch(signOut());
        }
      });
  }
};

createAuthRefreshInterceptor(axiosService, refreshAuthLogic);

export default axiosService;
