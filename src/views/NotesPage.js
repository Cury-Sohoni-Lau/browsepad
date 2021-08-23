import React, { useContext } from "react";
import Notes from "../components/Notes";
import { Context } from "../Store";

export default function NotesPage() {
  const [state] = useContext(Context);

  return (
    <div>
      {state.user && state.user.name ? <><p>Hello, {state.user.name}</p><Notes /></> : ""}
    </div>
  );
}
