import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../Store";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import ToggleSharedNotesButton from "./ToggleSharedNotesButton";
import { useHistory } from "react-router-dom";
import TabButtons from "./ui/TabButtons";
import useStyles from "../styles";

export default function Navbar() {
  const [state, dispatch] = useContext(Context);
  const classes = useStyles();

  const logout = () => {
    localStorage.setItem("jwt_token", "");
    dispatch("UNSET_USER_AND_TOKEN");
    window.location.reload();
  };

  return (
    <AppBar position="static" className={classes.navbar}>
      <Toolbar>
        {state.user.id ? (
          <>
            <Link
              to="/notes"
              style={{ textDecoration: "none", color: "black" }}
            >
              <Button className={classes.button}>Notes</Button>
            </Link>{" "}
            <Link
              to="/profile"
              style={{ textDecoration: "none", color: "black" }}
            >
              <Button className={classes.button}>Profile</Button>
            </Link>
            <Button onClick={logout} className={classes.button}>
              Logout
            </Button>
            <div
              className="circle-pic profile-pic-small"
              style={{
                position: "absolute",
                right: "1rem",
                backgroundImage: `url(${
                  state.user.image || "../profile-default.png"
                })`,
              }}
            ></div>
          </>
        ) : (
          <>
            <Button className={classes.button}>
              <Link
                to="/register"
                style={{ textDecoration: "none", color: "black" }}
              >
                Sign up
              </Link>{" "}
            </Button>
            <Button className={classes.button}>
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "black" }}
              >
                Login
              </Link>
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
