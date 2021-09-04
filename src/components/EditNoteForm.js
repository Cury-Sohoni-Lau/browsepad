import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from "../Store";
import { host } from "../utils";
import NoteModal from "./ui/NoteModal";
import useStyles from "../styles";
import Button from "@material-ui/core/Button";
import ReactMarkdown from "react-markdown";
import EditIcon from "@material-ui/icons/Edit";

export default function EditNoteForm({ handleOpen, variant, color }) {
  const classes = useStyles();
  const [state, dispatch] = useContext(Context);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [content, setContent] = useState("");
  const [open, setOpen] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleSubmit = async (e) => {
    const id = state.selectedNote.id;
    await axios.patch(
      `${host}/api/notes/${id}`,
      {
        title: title,
        content: content,
        user_id: state.user.id,
        url: url,
      },
      { headers: { Authorization: `Bearer ${state.token}` } }
    );
  };

  useEffect(() => {
    setTitle(state.selectedNote.title);
    setContent(state.selectedNote.content);
    setUrl(state.selectedNote.url);
  }, [state.selectedNote]);

  return (
    <NoteModal
      open={open}
      setOpen={setOpen}
      openModalButtonText={<EditIcon />}
      submitFormButtonText="Save"
      handleOpen={handleOpen}
      handleSubmit={handleSubmit}
      variant="contained"
      color="primary"
      className={`${classes.buttonLightBlue} ${classes.whiteTextButton}`}
    >
      <>
        <h3>Title</h3>
        <input
          className={classes.formInput}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <p>Content</p>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex" }}>
            <Button
              className={`${classes.button}`}
              style={{
                border: "1px solid black",
                backgroundColor: showPreview ? "white" : "pink",
              }}
              onClick={() => setShowPreview(false)}
            >
              Write
            </Button>
            <Button
              className={`${classes.button}`}
              style={{
                border: "1px solid black",
                backgroundColor: showPreview ? "pink" : "white",
              }}
              onClick={() => setShowPreview(true)}
            >
              Preview
            </Button>
          </div>
          <div className={classes.formInput} style={{ height: "30vh" }}>
            {showPreview ? (
              <div
                style={{
                  border: "1px solid black",
                  height: "30vh",
                  overflowY: "scroll",
                }}
              >
                <ReactMarkdown>{content}</ReactMarkdown>{" "}
              </div>
            ) : (
              <textarea
                className={classes.formInput}
                value={content}
                style={{ height: "30vh" }}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            )}
          </div>
        </div>
        <p>URL</p>
        <input
          className={classes.formInput}
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        ></input>
      </>
    </NoteModal>
  );
}
