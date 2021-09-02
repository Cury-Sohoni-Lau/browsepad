import React, { useState, useContext, useEffect } from "react";
import { Context } from "../Store";
import { FaFolderOpen } from "react-icons/fa";
import Button from "@material-ui/core/Button";

export default function ToggleSharedNotesButton() {
    const [state, dispatch] = useContext(Context);

    const showMyNotes = () => {
        dispatch({ type: "SET_NOTES", payload: state.myNotes });
        dispatch({ type: "SET_SHOWING_SHARED_NOTES", payload: false });
    }
    const showSharedNotes = () => {
        dispatch({ type: "SET_NOTES", payload: state.sharedNotes });
        dispatch({ type: "SET_SHOWING_SHARED_NOTES", payload: true });
    }
    return (
        <div>
            <Button onClick={showMyNotes}>
            <FaFolderOpen />{" "}
               My Notes
            </Button>
            <Button onClick={showSharedNotes}>
            <FaFolderOpen />{" "}
                Shared with me
            </Button>
        </div>
    )
}
