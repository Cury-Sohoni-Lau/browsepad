import React, { useContext } from "react";
import { Context } from "../Store";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import moment from "moment"
import 'bootstrap/dist/css/bootstrap.min.css';

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
        <Card.Subtitle className="mb-2 text-muted">
          {"Created: " + moment(note.created_at).fromNow()}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          {"Modified: " + moment(note.modified_at).fromNow()}
        </Card.Subtitle>
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
