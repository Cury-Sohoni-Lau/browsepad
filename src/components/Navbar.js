import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../Store";
import { useHistory } from "react-router";

export default function Navbar() {
  const [state, dispatch] = useContext(Context);
  const history = useHistory();

  const logout = () => {
    localStorage.setItem("jwt_token", "");
    dispatch("UNSET_USER_AND_TOKEN");
    window.location.reload();
  };

  return (
    <div>
      {state.user.id ? (
        <>
          <Link to="/notes">Go to notes</Link>
          <button onClick={logout}>Log out</button>
        </>
      ) : (
        <>
          <Link to="/register">Sign up!</Link>
          <Link to="/login">Login</Link>
        </>
      )}
    </div>
  );
}
