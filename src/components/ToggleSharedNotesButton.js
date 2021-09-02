import React, { useState, useContext, useEffect } from "react";
import { Context } from "../Store";
import { FaFolderOpen } from "react-icons/fa";
import Button from "@material-ui/core/Button";

export default function ToggleSharedNotesButton() {
    const [state, dispatch] = useContext(Context);
    const toggleSharedNotes = () => {
        if (state.showingSharedNotes) {
          dispatch({ type: "SET_NOTES", payload: state.myNotes });
          dispatch({ type: "SET_SHOWING_SHARED_NOTES", payload: false });
        } else {
          dispatch({ type: "SET_NOTES", payload: state.sharedNotes });
          dispatch({ type: "SET_SHOWING_SHARED_NOTES", payload: true });
        }
      };
    return (
        <div>
            <Button onClick={toggleSharedNotes}>
            <FaFolderOpen />{" "}
                {state.showingSharedNotes ? "My Notes" : "Shared with me"}
            </Button>
        </div>
    )
}
