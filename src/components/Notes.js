import React, { useEffect, useContext } from "react";
import { Context } from "../Store";
import axios from "axios";
import Note from "./Note";
import AddNoteForm from "./AddNoteForm";
import EditNoteForm from "./EditNoteForm";
import NotesSidebar from "./NotesSidebar"
import { extractHashtags } from "../utils";

export default function Notes() {
  const [state, dispatch] = useContext(Context);

  useEffect(() => {
    if (state.token) {
      const setNotes = async () => {
        const response = await axios.get("/api/notes", {
          headers: { Authorization: `Bearer ${state.token}` },
        });

        let notes = response.data;
        notes = notes.map((note) => {
          return {
            ...note,
            hashtags: extractHashtags(note) || []
          }
        })
        console.log("NOTES: ", notes)
        dispatch({ type: "SET_NOTES", payload: notes })
      };
      setNotes();
    }
  }, [state.token, dispatch]);

  return (
    <div>
      <AddNoteForm />
      <EditNoteForm />
      <div id="notes-main">
        <NotesSidebar />
        <div id="notes-wrapper">
          {state.filteredNotes.map((note) => (
            <Note key={note.id} note={note} />
          ))}
        </div>
      </div>
    </div>
  );
}
