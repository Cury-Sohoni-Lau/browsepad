import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../Store";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import ToggleSharedNotesButton from "./ToggleSharedNotesButton";
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
            <Button className={classes.button}>
              <Link to="/notes" style={{textDecoration: 'none', color: 'black'}}>Notes</Link>{" "}
            </Button>
            <Button className={classes.button}>
              <Link to="/profile" style={{textDecoration: 'none', color: 'black'}}>Profile</Link>
            </Button>
            <Button onClick={logout} className={classes.button}>
              Logout
            </Button>
            <div
              className="circle-pic profile-pic-small"
              style={{
                position:"absolute",
                right: "1rem",
                backgroundImage: `url(${
                  state.user.image || "../profile-default.png"
                })`,
              }}
            ></div>
          </>
        ) : (
          <>
            <Link to="/register">Sign up!</Link> <Link to="/login">Login</Link>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
