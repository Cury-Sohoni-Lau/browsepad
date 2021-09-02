import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../Store";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import ToggleSharedNotesButton from "./ToggleSharedNotesButton";
import TabButtons from "./ui/TabButtons";

export default function Navbar() {
  const [state, dispatch] = useContext(Context);

  const logout = () => {
    localStorage.setItem("jwt_token", "");
    dispatch("UNSET_USER_AND_TOKEN");
    window.location.reload();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {state.user.id ? (
          <>
            <Link to="/notes">Notes</Link> <Link to="/profile">Profile</Link>
            <Button onClick={logout}>Log out</Button>
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
