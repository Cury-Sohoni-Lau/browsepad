import React, { useContext, useEffect, useState } from "react";
import { Context } from "../Store";
import axios from "axios";
import Button from "@material-ui/core/Button";
import moment from "moment";
import ShareModal from "./ShareModal";
import ReactMarkdown from "react-markdown";
import EditNoteForm from "./EditNoteForm";
import { host } from "../utils";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import useStyles from "../styles";
import { Container } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Grid from "@material-ui/core/Grid";

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
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteTimeout, setDeleteTimeout] = useState();

  const handleShow = () => {
    dispatch({ type: "SET_SELECTED_NOTE", payload: note });
  };

  const handleDelete = async (e) => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      setDeleteTimeout(setTimeout(() => setConfirmDelete(false), 5000));
      return;
    }
    clearTimeout(deleteTimeout);
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
      <CardContent style={{ padding: "3rem" }}>
        <Typography gutterBottom variant="h5" component="h2">
          {note.title}
        </Typography>
        {typeof note.image != "undefined" && (
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              className="circle-pic profile-pic-small"
              style={{
                marginRight: "0.5rem",
                backgroundImage: `url(${
                  note.image || "../profile-default.png"
                })`,
              }}
            ></div>
            <p style={{ margin: "0" }}>By {note.name}</p>
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
            <Grid container>
              <Grid item xs={12} sm={8} md={4} style={{ margin: "auto" }}>
                <Card>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={metadata.link}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    {metadata.image && (
                      <CardMedia>
                        <div
                          style={{
                            margin: "auto",
                            backgroundImage: `url(${metadata.image})`,
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                            height: "18vh",
                          }}
                        ></div>
                      </CardMedia>
                    )}
                    <CardContent style={{ padding: "1rem" }}>
                      <p style={{ fontSize: "1.2rem" }}>{metadata.title}</p>
                      <p style={{ fontSize: "0.8rem", margin: "0" }}>
                        {metadata.description &&
                        metadata.description.length > 50
                          ? metadata.description.substring(0, 50) + "..."
                          : metadata.description}
                      </p>
                      <Typography></Typography>
                    </CardContent>
                  </a>
                </Card>
              </Grid>
            </Grid>
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
            className={`${classes.button} ${
              confirmDelete
                ? classes.borderRed + " "
                : classes.buttonRed + " " + classes.whiteTextButton
            }`}
          >
            {confirmDelete ? "Delete?" : <DeleteIcon />}
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
