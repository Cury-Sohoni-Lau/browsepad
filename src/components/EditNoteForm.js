import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from "../Store";
import { host } from "../utils";
import NoteModal from "./ui/NoteModal";
import useStyles from "../styles";
import Button from "@material-ui/core/Button";
import ReactMarkdown from "react-markdown";
import EditIcon from "@material-ui/icons/Edit";
import TextField from "@material-ui/core/TextField";

export default function EditNoteForm({ handleOpen, variant, color }) {
  const classes = useStyles();
  const [state] = useContext(Context);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [content, setContent] = useState("");
  const [open, setOpen] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const selectedColor = "#5ab9ea";

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
        <TextField
          className={classes.formInput}
          label="Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              marginTop: "2rem",
              marginBottom: "0.4rem",
            }}
          >
            <Button
              className={`${classes.button}`}
              style={{
                borderWidth: "3px",
                borderStyle: "solid",
                borderColor: showPreview ? "#eee" : selectedColor,
              }}
              onClick={() => setShowPreview(false)}
            >
              Write
            </Button>
            <Button
              className={`${classes.button}`}
              style={{
                borderWidth: "3px",
                borderStyle: "solid",
                borderColor: showPreview ? selectedColor : "#eee",
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
                  padding: "1rem",
                  overflowY: "scroll",
                }}
              >
                <ReactMarkdown>{content}</ReactMarkdown>{" "}
              </div>
            ) : (
              <TextField
                className={classes.formInput}
                value={content}
                style={{ height: "30vh" }}
                onChange={(e) => setContent(e.target.value)}
                id="outlined-multiline-static"
                label="Memo"
                multiline
                rows={8}
                variant="outlined"
              />
            )}
          </div>
        </div>
        <TextField
          className={classes.formInput}
          label="URL"
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </>
    </NoteModal>
  );
}
