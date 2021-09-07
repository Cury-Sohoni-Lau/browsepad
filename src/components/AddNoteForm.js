import { useState, useContext } from "react";
import { Context } from "../Store";
import axios from "axios";
import { host } from "../utils";
import NoteModal from "./ui/NoteModal";
import AddBoxIcon from "@material-ui/icons/AddBox";
import Button from "@material-ui/core/Button";
import useStyles from "../styles";
import ReactMarkdown from "react-markdown";
import TextField from "@material-ui/core/TextField";

export default function AddNoteForm({ className }) {
  const [state] = useContext(Context);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [showPreview, setShowPreview] = useState(false);

  const selectedColor = "#5ab9ea";

  const handleSubmit = async () => {
    await axios.post(
      `${host}/api/notes`,
      {
        title: title,
        content: content,
        url: url,
      },
      { headers: { Authorization: `Bearer ${state.token}` } }
    );
    setTitle("");
    setContent("");
    setUrl("");
  };

  return (
    <NoteModal
      open={open}
      setOpen={setOpen}
      openModalButtonText={<AddBoxIcon />}
      submitFormButtonText="Save"
      handleSubmit={handleSubmit}
      className={className}
    >
      <>
        <TextField
          className={classes.formInput}
          label="Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {/* <input
          className={classes.formInput}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input> */}
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
                <ReactMarkdown>{content}</ReactMarkdown>
              </div>
            ) : (
              <>
                {/* <textarea
                  className={classes.formInput}
                  value={content}
                  style={{ height: "30vh" }}
                  onChange={(e) => setContent(e.target.value)}
                ></textarea> */}
                <TextField
                  className={classes.formInput}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  id="outlined-multiline-static"
                  label="Memo"
                  multiline
                  rows={8}
                  variant="outlined"
                />
              </>
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
