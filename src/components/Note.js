import React, { useContext, useEffect, useState } from "react";
import { Context } from "../Store";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { FaTrash } from "react-icons/fa";
import moment from "moment";
import { LinkPreview } from "@dhaiwat10/react-link-preview";
import ShareModal from "./ShareModal";
import ReactMarkdown from "react-markdown";
import EditNoteForm from "./EditNoteForm";
import { host } from "../utils";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import useStyles from "../styles";
import { Container } from "@material-ui/core";
import { linkPreview } from "link-preview-node";
import DeleteIcon from "@material-ui/icons/Delete";

export default function Note({
  passedNote,
  noteID,
  setShowShareSuccess,
  isPublicLink,
}) {
  const classes = useStyles();
  const [state, dispatch] = useContext(Context);
  const [note, setNote] = useState({
    content: "",
  });
  const [metadata, setMetadata] = useState({});

  const handleShow = () => {
    dispatch({ type: "SET_SELECTED_NOTE", payload: note });
  };

  const handleDelete = async (e) => {
    const id = note.id;
    await axios.delete(`${host}/api/notes/${id}`, {
      headers: { Authorization: `Bearer ${state.token}` },
    });
    dispatch({ type: "REFRESH" });
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

  useEffect(() => {
    const getMetadata = async () => {
      const response = await axios.post(
        `${host}/api/getmetadata`,
        { url: note.url },
        { headers: { Authorization: `Bearer ${state.token}` } }
      );
      console.log(response);
      setMetadata(response.data);
    };
    getMetadata();
  }, [note]);

  return (
    <Card
      className={`${classes.frosty} ${classes.shadowWeak}`}
      style={{ margin: "1rem 0" }}
    >
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {note.title}
        </Typography>
        {typeof note.image != "undefined" && (
          <div style={{ display: "flex" }}>
            <div
              className="circle-pic profile-pic-small"
              style={{
                backgroundImage: `url(${
                  note.image || "../profile-default.png"
                })`,
              }}
            ></div>
            <p>{note.name}</p>
          </div>
        )}
        <Container
          style={{
            margin: "1rem auto",
            padding: "1.5rem",
            borderRadius: "10px",
            backgroundColor: "white",
          }}
          className={classes.shadowWeak}
        >
          <ReactMarkdown>{note.content}</ReactMarkdown>

          {note.url && (
            <Container style={{ margin: "auto" }}>
              <Card>
                <a
                  href={metadata.link}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <CardMedia>
                    {" "}
                    <img style={{ width: "100%" }} src={metadata.image} />
                  </CardMedia>
                  <CardContent>
                    <Typography variant="h6">{metadata.title}</Typography>
                    <Typography>{metadata.description}</Typography>
                  </CardContent>
                </a>
              </Card>
            </Container>
          )}
        </Container>
        <Container style={{ display: "flex", flexDirection: "column" }}>
          <Typography
            style={{ marginTop: "1rem" }}
            variant="caption"
            className="mb-2 text-muted"
          >
            {"Created: " + moment(note.created_at).fromNow()}
          </Typography>
          <Typography variant="caption" className="mb-2 text-muted">
            {"Modified: " + moment(note.modified_at).fromNow()}
          </Typography>
        </Container>
      </CardContent>
      {!state.showingSharedNotes && !isPublicLink && (
        <CardActions>
          <Button
            onClick={handleDelete}
            variant="contained"
            color="secondary"
            className={`${classes.button} ${classes.buttonRed} ${classes.whiteTextButton}`}
          >
            <DeleteIcon />
          </Button>
          <EditNoteForm handleOpen={handleShow} />
          <ShareModal note={note} setShowShareSuccess={setShowShareSuccess} />
        </CardActions>
      )}
    </Card>
    // <Card>
    //   <Card.Body>
    //     <Card.Title>{note.title}</Card.Title>
    // {typeof note.image != "undefined" && (
    //   <div
    //     className="circle-pic profile-pic-small"
    //     style={{
    //       backgroundImage: `url(${note.image || "../profile-default.png"})`,
    //     }}
    //     onMouseEnter={() => setShowUserName(true)}
    //     onMouseLeave={() => setShowUserName(false)}
    //   ></div>
    // )}
    // {showUserName && (
    //   <p
    //     style={{
    //       position: "absolute",
    //       backgroundColor: "pink",
    //     }}
    //   >
    //     {note.name}
    //   </p>
    // )}

    //     <ReactMarkdown>{note.content}</ReactMarkdown>
    //     <Card.Subtitle className="mb-2 text-muted">
    //       {"Created: " + moment(note.created_at).fromNow()}
    //     </Card.Subtitle>
    //     <Card.Subtitle className="mb-2 text-muted">
    //       {"Modified: " + moment(note.modified_at).fromNow()}
    //     </Card.Subtitle>
    //     {/* <Card.Link href={note.url}>{note.url}</Card.Link> */}
    //     {note.url && <LinkPreview url={note.url} width="55vw" />}
    //     {!state.showingSharedNotes && !isPublicLink && (
    //       <div className="note-buttons">
    //         <Button onClick={handleDelete}>
    //           <FaTrash />
    //         </Button>
    //         <EditNoteForm handleOpen={handleShow} />
    //         <ShareModal note={note} setShowShareSuccess={setShowShareSuccess} />
    //       </div>
    //     )}
    //   </Card.Body>
    // </Card>
  );
}
