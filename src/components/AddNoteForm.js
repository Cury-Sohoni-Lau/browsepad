import { useState, useContext } from "react";
import { Context } from "../Store";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import { host } from "../utils";
import NoteModal from "./ui/NoteModal";
import AddBoxIcon from "@material-ui/icons/AddBox";
import Button from "@material-ui/core/Button";
import useStyles from "../styles";
import ReactMarkdown from "react-markdown";

export default function AddNoteForm({ className }) {
  const [state, dispatch] = useContext(Context);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [showPreview, setShowPreview] = useState(false);

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
        <h3>Title</h3>
        <input
        className={classes.formInput}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <p>Content</p>
        <div style={{display: "flex", flexDirection: "column"}}>
          <div style={{display: "flex"}}>
            <Button className={`${classes.button}`} style={{border: "1px solid black", backgroundColor: showPreview ? "white" : "pink"}} onClick={() => setShowPreview(false)}>Write</Button>
            <Button className={`${classes.button}`} style={{border: "1px solid black", backgroundColor: showPreview ? "pink" : "white"}} onClick={() => setShowPreview(true)}>Preview</Button>
          </div>
          <div className={classes.formInput} style={{height: "30vh"}}>
          {showPreview ? <div style={{border: "1px solid black", height: "30vh", overflowY: "scroll"}}><ReactMarkdown>{content}</ReactMarkdown></div> : <textarea
          className={classes.formInput}
            value={content}
            style={{height: "30vh"}}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>}
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
