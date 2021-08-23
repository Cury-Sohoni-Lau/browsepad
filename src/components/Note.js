import React, { useContext } from "react";
import { Context } from "../Store";
import axios from "axios";
import Button from "react-bootstrap/Button";

export default function Note({ note }) {
  const [state, dispatch] = useContext(Context);

  const handleShow = () => {
    dispatch({ type: "SET_SELECTED_NOTE", payload: note });
    dispatch({ type: "TOGGLE_SHOW_EDIT_FORM" });
  };

  const handleDelete = async (e) => {
    const id = note.id;
    await axios.delete(`/api/notes/${id}`, {
      headers: { Authorization: `Bearer ${state.token}` },
    });
    window.location.reload();
  };

  return (
    <div>
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <p>URL: {note.url}</p>
      <Button variant="danger" onClick={handleDelete}>
        Delete
      </Button>
      <Button variant="primary" onClick={handleShow}>
        Edit Note
      </Button>
    </div>
  );
}
