import React, { useState, useContext, useEffect } from "react";
import { Context } from "../Store";
import Button from "@material-ui/core/Button";
import useStyles from "../styles";
import FolderIcon from "@material-ui/icons/Folder";
import FolderSharedIcon from "@material-ui/icons/FolderShared";
import AddNoteForm from "./AddNoteForm";

export default function ToggleSharedNotesButton() {
  const classes = useStyles();
  const [state, dispatch] = useContext(Context);

  const showMyNotes = () => {
    dispatch({ type: "SET_NOTES", payload: state.myNotes });
    dispatch({ type: "SET_SHOWING_SHARED_NOTES", payload: false });
  };
  const showSharedNotes = () => {
    dispatch({ type: "SET_NOTES", payload: state.sharedNotes });
    dispatch({ type: "SET_SHOWING_SHARED_NOTES", payload: true });
  };
  return (
    <div>
      <AddNoteForm
        className={`${classes.frosty} ${classes.button} ${classes.shadowWeak}`}
      />
      <Button
        onClick={showMyNotes}
        style={{ margin: "0 0.5rem" }}
        className={`${classes.frosty} ${classes.button} ${classes.shadowWeak}`}
      >
        <FolderIcon /> My Notes
      </Button>
      <Button
        onClick={showSharedNotes}
        className={`${classes.frosty} ${classes.button} ${classes.shadowWeak}`}
      >
        <FolderSharedIcon /> Shared with me
      </Button>
    </div>
  );
}
