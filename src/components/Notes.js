import React, { useEffect, useContext, useState } from "react";
import { Context } from "../Store";
import axios from "axios";
import Note from "./Note";

export default function Notes() {
  const [state] = useContext(Context);
  const [notes, setNotes] = useState([]);
  const showNotes = async () => {
    const response = await axios.get("/api/notes", {
      headers: { jwt_token: state.token },
    });
    setNotes(response.data);
  };

  useEffect(() => {
    if (state.token) {
      showNotes();
    }
  });

  return (
    <div>
      <p>{state.token}</p>
      {notes.map((note) => (
        <Note key={note.id} note={note} />
      ))}
    </div>
  );
}
