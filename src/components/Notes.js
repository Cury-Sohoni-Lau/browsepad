import React, { useEffect, useContext, useState } from "react";
import { Context } from "../Store";
import axios from "axios";
import Note from "./Note";
import AddNoteForm from "./AddNoteForm";
import EditNoteForm from "./EditNoteForm";
import NotesSidebar from "./NotesSidebar";
import { extractHashtags, host } from "../utils";
import { Switch, Route, useRouteMatch } from "react-router-dom";

export default function Notes() {
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
    <Switch>
      <Route
        path={`${parentMatch.url}/:noteID`}
        render={({ match }) => (
          <Note noteID={match.params.noteID} isPublicLink={true} />
        )}
      />
      <Route path={parentMatch.url}>
        <div>
          <AddNoteForm />
          <EditNoteForm />
          <div id="notes-main">
            <NotesSidebar />
            <div id="notes-wrapper">
              {state.filteredNotes.map((note) => (
                <Note
                  key={note.id}
                  passedNote={note}
                  setShowShareSuccess={setShowShareSuccess}
                />
              ))}
            </div>
            <div
              id="share-success"
              className={showShareSuccess ? "" : "hidden"}
            >
              YOU SHARED A NOTE!!!!
            </div>
          </div>
        </div>
      </Route>
    </Switch>
  );
}
