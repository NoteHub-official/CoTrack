import React, { Fragment, useState } from "react";
import "./login.css";
import logo from "../../static/logo_transparent.png";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/user/user.selectors";

import { signInAsync, resetPasswordInAsync } from "../../redux/user/user.actions";
import { useDispatch } from "react-redux";

export default function AuthPage(props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [login, setLogin] = useState(true);
  const obj = useSelector(selectCurrentUser);
  const access = obj ? obj.access : "";

  const dispatch = useDispatch();


  const tempHandleLogin(username, password){
    axios
      .post(`${process.env.REACT_APP_API_URL_AUTH}/jwt/create/`, {
        username,
        password,
      })
      .then((res) => {
        return res.access;
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const access = await tempHandleLogin(userName, password);
      if (!login) await dispatch(resetPasswordInAsync(password, newPassword, access));
    } catch (e) {
      console.log(e.message);
    }
  };

  const keyPress = (e) => {
    if (e.key === "Enter") {
      dispatch(signInAsync(userName, password));
    }
  };

  const authText = login ? "Login" : "Signup";

  return (
    <React.Fragment>
      <div className="auth-background">
        <div className="auth-window">
          <div className="auth-icon">
            <img src={logo} alt="cotrack-logo" style={{ width: 300, margin: "auto" }} />
          </div>
          <div className="auth-form">
            <Typography variant="h6" style={{ marginBottom: 1, fontSize: "1.5em" }}>
              {authText}
            </Typography>

            <div className="auth-login">
              {login ? (
                <Fragment>
                  <div className="auth-input-container">
                    <Typography variant="h6" style={{ marginBottom: 1, fontSize: "0.8em" }}>
                      Username
                    </Typography>
                    <input
                      type="text"
                      placeholder="Username"
                      className="auth-input"
                      value={userName}
                      onChange={(e) => setUserName(e.currentTarget.value)}
                    />
                  </div>
                  <div className="auth-input-container">
                    <Typography variant="h6" style={{ marginBottom: 1, fontSize: "0.8em" }}>
                      Password 🔐
                    </Typography>
                    <input
                      type="password"
                      placeholder="Password"
                      className="auth-input"
                      value={password}
                      onKeyPress={keyPress}
                      onChange={(e) => setPassword(e.currentTarget.value)}
                    />
                  </div>
                </Fragment>
              ) : (
                <Fragment>
                  <div className="auth-input-container">
                    <Typography variant="h6" style={{ marginBottom: 1, fontSize: "0.8em" }}>
                      Username
                    </Typography>
                    <input
                      type="text"
                      placeholder="Username"
                      className="auth-input"
                      value={userName}
                      onChange={(e) => setUserName(e.currentTarget.value)}
                    />
                  </div>
                  <div className="auth-input-container">
                    <Typography variant="h6" style={{ marginBottom: 1, fontSize: "0.8em" }}>
                      Old Password 🔐
                    </Typography>
                    <input
                      type="password"
                      placeholder="Password"
                      className="auth-input"
                      value={password}
                      onKeyPress={keyPress}
                      onChange={(e) => setPassword(e.currentTarget.value)}
                    />
                  </div>
                  <div className="auth-input-container">
                    <Typography variant="h6" style={{ marginBottom: 1, fontSize: "0.8em" }}>
                      New Password 🔐
                    </Typography>
                    <input
                      type="password"
                      placeholder="Password"
                      className="auth-input"
                      value={newPassword}
                      onKeyPress={keyPress}
                      onChange={(e) => setNewPassword(e.currentTarget.value)}
                    />
                  </div>
                </Fragment>
              )}
            </div>

            <div className="auth-divider"></div>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              sx={{ width: "80%" }}
              disabled={
                password.length === 0 ||
                userName.length === 0 ||
                (!login && newPassword.length === 0)
              }
            >
              <Typography variant="h6" style={{ fontSize: "1em", color: "white" }}>
                {authText}
              </Typography>
            </Button>
            <Grid container sx={{ ml: 9, pt: 1 }}>
              <Typography
                variant="body1"
                color="#1fb6ff"
                sx={{ fontSize: "0.8rem", textDecoration: "underline", cursor: "pointer" }}
                onClick={() => setLogin(!login)}
              >
                {login ? "Reset password" : "Login to existing account"}
              </Typography>
            </Grid>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
