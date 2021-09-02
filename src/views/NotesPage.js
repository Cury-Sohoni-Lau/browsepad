import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Notes from "../components/Notes";
import { Context } from "../Store";

export default function NotesPage() {
  const history = useHistory();
  const [state] = useContext(Context);

  useEffect(() => {
    if (!state.user || !state.user.name) {
      history.push("/");
    }
  }, [state.user]);

  return (
    <div>
      <Notes />
    </div>
  );
}
