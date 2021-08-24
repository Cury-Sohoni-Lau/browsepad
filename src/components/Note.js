import React, { useContext } from "react";
import { Context } from "../Store";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { FaTrash, FaPencilAlt } from "react-icons/fa";

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
    <Card>
      <Card.Body>
        <Card.Title>{note.title}</Card.Title>
        <Card.Text>
          {note.content}
        </Card.Text>
        <Card.Link href={note.url}>{note.url}</Card.Link>
        <div className="note-buttons">
          <Button variant="danger" onClick={handleDelete}>
            <FaTrash />
          </Button>
          <Button variant="primary" onClick={handleShow}>
            <FaPencilAlt />
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
