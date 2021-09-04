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
  const history = useHistory();

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
            >
              <Button className={`${classes.button} ${classes.whiteTextButton}`}>Notes</Button>
            </Link>{" "}
            <Link
              to="/profile"
            >
              <Button className={`${classes.button} ${classes.whiteTextButton}`}>Profile</Button>
            </Link>
            <Button onClick={logout} className={`${classes.button} ${classes.whiteTextButton}`}>
              Logout
            </Button>
            <div 
              onClick={() => history.push("/profile")}
              className="circle-pic profile-pic-small"
              style={{
                cursor: "pointer",
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
            
              <Link
                to="/register"
              >
                <Button className={`${classes.button} ${classes.whiteTextButton}`}>Sign up </Button>
              </Link>{" "}
           
            
              <Link
                to="/login"
              >
                <Button className={`${classes.button} ${classes.whiteTextButton}`}>Login</Button>
              </Link>
            
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
