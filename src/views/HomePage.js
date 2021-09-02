import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../Store";

export default function HomePage() {
  const [state] = useContext(Context);
  const history = useHistory();
  useEffect(() => {
    if (state.user.id) {
      history.push("/notes");
    }
  }, [state, history]);
  return (
    <div id="home">
      <p>Welcome! Please sign in or sign up.</p>
    </div>
  );
}
