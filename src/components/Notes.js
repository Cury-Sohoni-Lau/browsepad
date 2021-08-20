import React, { useEffect, useContext, useState } from "react";
import { Context } from "../Store";
import axios from "axios";
import Note from "./Note";
import AddNoteForm from "./AddNoteForm";
import EditNoteForm from "./EditNoteForm";

export default function Notes() {
  const [state] = useContext(Context);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (state.token) {
      const showNotes = async () => {
        const response = await axios.get("/api/notes", {
          headers: { Authorization: `Bearer ${state.token}` },
        });
        setNotes(response.data);
      };
      showNotes();
    }
  }, [state.token]);

  return (
    <div>
      <AddNoteForm />
      <EditNoteForm />
      {notes.map((note) => (
        <Note key={note.id} note={note} />
      ))}
    </div>
  );
}
