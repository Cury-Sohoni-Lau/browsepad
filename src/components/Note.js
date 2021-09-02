import React, { useContext, useEffect, useState } from "react";
import { Context } from "../Store";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Card from "react-bootstrap/Card";
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import moment from "moment";
import { LinkPreview } from "@dhaiwat10/react-link-preview";
import ShareModal from "./ShareModal";
import ReactMarkdown from "react-markdown";
import EditNoteForm from "./EditNoteForm";
import { host } from "../utils";

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
  const [showUserName, setShowUserName] = useState(false);

  const handleShow = () => {
    dispatch({ type: "SET_SELECTED_NOTE", payload: note });
  };

  const handleDelete = async (e) => {
    const id = note.id;
    await axios.delete(`${host}/api/notes/${id}`, {
      headers: { Authorization: `Bearer ${state.token}` },
    });
    window.location.reload();
  };

  const getPublicNote = async (noteID) => {
    const response = await axios.get(`${host}/api/notes/shared/${noteID}`);
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
        {typeof note.image != "undefined" && (
          <div
            className="circle-pic profile-pic-small"
            style={{
              backgroundImage: `url(${note.image || "../profile-default.png"})`,
            }}
            onMouseEnter={() => setShowUserName(true)}
            onMouseLeave={() => setShowUserName(false)}
          ></div>
        )}
        {showUserName && (
          <p
            style={{
              position: "absolute",
              backgroundColor: "pink",
            }}
          >
            {note.name}
          </p>
        )}

        <ReactMarkdown>{note.content}</ReactMarkdown>
        <Card.Subtitle className="mb-2 text-muted">
          {"Created: " + moment(note.created_at).fromNow()}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          {"Modified: " + moment(note.modified_at).fromNow()}
        </Card.Subtitle>
        {/* <Card.Link href={note.url}>{note.url}</Card.Link> */}
        {note.url && <LinkPreview url={note.url} width="55vw" />}
        {!state.showingSharedNotes && !isPublicLink && (
          <div className="note-buttons">
            <Button onClick={handleDelete}>
              <FaTrash />
            </Button>
            <EditNoteForm handleOpen={handleShow} />
            <ShareModal note={note} setShowShareSuccess={setShowShareSuccess} />
          </div>
        )}
      </Card.Body>
    </Card>
  );
}
