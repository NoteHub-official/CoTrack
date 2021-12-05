import React, { useState } from "react";
import "./login.css";
import logo from "../../static/logo_transparent.png";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

export default function AuthPage({ history, login, register, logout }) {
  const [selectLogin, setSelectLogin] = useState(true);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [processing, setProcessing] = useState(false);

  const handleAuthAction = async (e) => {
    e.preventDefault();
    if (selectLogin) {
      setProcessing(true);
      const loginSuccess = await login({
        user_name: userName,
        password: password,
      });
      setProcessing(false);
      if (loginSuccess) {
        history.push("/");
      } else {
        alert("Login failed - Wrong username or password");
      }
    } else {
      setProcessing(true);
      const registerSuccess = await register({
        user_name: userName,
        password: password,
      });
      setProcessing(false);
      if (registerSuccess) {
        history.push("/");
      } else {
        alert("Registration failed - The user already exists");
      }
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
              {selectLogin ? "Login" : "Register"}
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
                  Password
                </Typography>
                <input
                  type="password"
                  placeholder="Password"
                  className="auth-input"
                  value={password}
                  onChange={(e) => setPassword(e.currentTarget.value)}
                />
              </div>
            </div>

            <div className="auth-divider"></div>
            <Button
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
