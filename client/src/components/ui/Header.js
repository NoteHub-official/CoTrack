import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import useScrollTrigger from "@mui/material/useScrollTrigger";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import { Link } from "react-router-dom";

import Spacer from "./Spacer";
//import logo from "../../logo.svg";
import logo from "../../static/logo_transparent.png";

import { selectCurrentUser } from "../../redux/user/user.selectors";

function ElevationScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: "1rem",
  },
}));

const Header = (props) => {
  const classes = useStyles();
  //const theme = useTheme();
  const { value, setValue } = props;

  const currentUser = useSelector(selectCurrentUser);

  const routes = [
    { name: "Home", link: "/" },
    { name: "Give Evaluation", link: "/give" },
    { name: "My Evaluation", link: "/me" },
  ];

  useEffect(() => {
    if (window.location.pathname === "/" && value !== 0) {
      setValue(0);
    } else if (window.location.pathname === "/give" && value !== 1) {
      setValue(1);
    } else if (window.location.pathname === "/me" && value !== 2) {
      setValue(2);
    }
  }, [value, setValue]);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const tabs = (
    <React.Fragment>
      <Tabs value={value} onChange={handleChange} indicatorColor="secondary">
        {routes.map((route, index) => (
          <Tab
            key={`${route}${index}`}
            component={Link}
            to={`${route.link}`}
            label={route.name}
          ></Tab>
        ))}
      </Tabs>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar position="fixed">
          <Toolbar disableGutters>
            <Button
              component={Link}
              to="/"
              disableRipple
              className={classes.logoContainer}
              onClick={() => {
                setValue(0);
              }}
            >
              <img
                src={logo}
                alt="logo"
                className={classes.logo}
                style={{ width: 52, margin: "auto" }}
              />
            </Button>
            {tabs}
            <Spacer />
            {currentUser ? (
              <Button
                color="inherit"
                className={classes.button}
                component={Link}
                to="/logout"
              >
                Logout
              </Button>
            ) : (
              <Button
                color="inherit"
                className={classes.button}
                component={Link}
                to="/login"
              >
                Login
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar sx={{ height: 64 }} />
    </React.Fragment>
  );
};

export default Header;
