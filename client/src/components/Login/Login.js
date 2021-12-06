import React, { useState } from "react";
import "./login.css";
import logo from "../../static/logo_transparent.png";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { signInAsync } from "../../redux/user/user.actions";
import { useDispatch } from "react-redux";

export default function AuthPage(props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInAsync(userName, password));
  };

  const keyPress = (e) => {
    if (e.key === "Enter") {
      dispatch(signInAsync(userName, password));
    }
  };

  return (
    <React.Fragment>
      <div className="auth-background">
        <div className="auth-window">
          <div className="auth-icon">
            <img
              src={logo}
              alt="cotrack-logo"
              style={{ width: 300, margin: "auto" }}
            />
          </div>
          <div className="auth-form">
            <Typography
              variant="h6"
              style={{ marginBottom: 1, fontSize: "1.5em" }}
            >
              Login
            </Typography>

            <div className="auth-login">
              <div className="auth-input-container">
                <Typography
                  variant="h6"
                  style={{ marginBottom: 1, fontSize: "0.8em" }}
                >
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
                <Typography
                  variant="h6"
                  style={{ marginBottom: 1, fontSize: "0.8em" }}
                >
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
            </div>

            <div className="auth-divider"></div>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              sx={{ width: "80%" }}
              disabled={password.length === 0 || userName.length === 0}
            >
              <Typography
                variant="h6"
                style={{ fontSize: "1em", color: "white" }}
              >
                Login
              </Typography>
            </Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
