import React, { useContext, useEffect, useState } from "react";
import { Context } from "../Store";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import moment from "moment";
import "bootstrap/dist/css/bootstrap.min.css";
import { LinkPreview } from "@dhaiwat10/react-link-preview";
import ShareModal from "./ShareModal";
import ReactMarkdown from "react-markdown";

export default function Note({
  passedNote,
  noteID,
  setShowShareSuccess,
  isPublicLink,
}) {
  const [state, dispatch] = useContext(Context);
  const [note, setNote] = useState({
    content: "",
  });

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

  const getPublicNote = async (noteID) => {
    const response = await axios.get(`/api/notes/shared/${noteID}`);
    console.log("retrieved note:", response.data);
    return response.data;
  };

  useEffect(() => {
    const getNote = async () => {
      if (!passedNote && noteID) {
        try {
          const retrievedNote = await getPublicNote(noteID);
          setNote(retrievedNote);
        } catch {
          setNote({
            title: "Note Not Found",
            content:
              "This note does not exist or it is not being shared publicly.",
          });
        }
      } else {
        setNote(passedNote);
      }
    };
    getNote();
  }, [passedNote, noteID]);

  return (
    <Card>
      <Card.Body>
        <Card.Title>{note.title}</Card.Title>
        <ReactMarkdown>{note.content}</ReactMarkdown>
        <Card.Subtitle className="mb-2 text-muted">
          {"Created: " + moment(note.created_at).fromNow()}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          {"Modified: " + moment(note.modified_at).fromNow()}
        </Card.Subtitle>
        {/* <Card.Link href={note.url}>{note.url}</Card.Link> */}
        <LinkPreview url={note.url} width="55vw" />
        {!state.showingSharedNotes && !isPublicLink && (
          <div className="note-buttons">
            <Button variant="danger" onClick={handleDelete}>
              <FaTrash />
            </Button>
            <Button variant="primary" onClick={handleShow}>
              <FaPencilAlt />
            </Button>
            <ShareModal note={note} setShowShareSuccess={setShowShareSuccess} />
          </div>
        )}
      </Card.Body>
    </Card>
  );
}
