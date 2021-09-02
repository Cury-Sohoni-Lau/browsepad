import React, { useEffect, useContext, useState } from "react";
import { Context } from "../Store";
import axios from "axios";
import Note from "./Note";
import AddNoteForm from "./AddNoteForm";
import NotesSidebar from "./NotesSidebar";
import { extractHashtags, host } from "../utils";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import ToggleSharedNotesButton from "./ToggleSharedNotesButton";
import useStyles from "../styles";

export default function Notes() {
  const classes = useStyles();
  let parentMatch = useRouteMatch();
  const [state, dispatch] = useContext(Context);
  const [showShareSuccess, setShowShareSuccess] = useState(false);

  useEffect(() => {
    if (state.token) {
      const setNotes = async () => {
        let response = await axios.get(`${host}/api/notes`, {
          headers: { Authorization: `Bearer ${state.token}` },
        });

        let myNotes = response.data;
        myNotes = myNotes.map((note) => {
          return {
            ...note,
            hashtags: extractHashtags(note) || [],
          };
        });
        dispatch({ type: "SET_MY_NOTES", payload: myNotes });
        dispatch({ type: "SET_NOTES", payload: myNotes });

        response = await axios.get(`${host}/api/notes/shared`, {
          headers: { Authorization: `Bearer ${state.token}` },
        });
        let sharedNotes = response.data;
        sharedNotes = sharedNotes.map((note) => {
          return {
            ...note,
            hashtags: extractHashtags(note) || [],
          };
        });
        dispatch({ type: "SET_SHARED_NOTES", payload: sharedNotes });
      };
      setNotes();
    }
  }, [state.token, dispatch, state.refresh]);

  return (
    <div>
      <div id="notes-main">
        <NotesSidebar />
        <div id="notes-wrapper">
          <ToggleSharedNotesButton />
          <div>
            {state.filteredNotes.map((note) => (
              <Note
                key={note.id}
                passedNote={note}
                setShowShareSuccess={setShowShareSuccess}
              />
            ))}
          </div>
        </div>
        <div id="share-success" className={showShareSuccess ? "" : "hidden"}>
          YOU SHARED A NOTE!!!!
        </div>
      </div>
    </div>
  );
}
