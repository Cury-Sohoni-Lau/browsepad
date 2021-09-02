import { useState, useContext } from "react";
import { Context } from "../Store";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import { host } from "../utils";
import NoteModal from "./ui/NoteModal";
import AddBoxIcon from "@material-ui/icons/AddBox";

export default function AddNoteForm({ className }) {
  const [state, dispatch] = useContext(Context);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [open, setOpen] = useState(false);

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
      submitFormButtonText="Save Changes"
      handleSubmit={handleSubmit}
      className={className}
    >
      <>
        <h3>Title</h3>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <p>Content</p>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <p>URL</p>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        ></input>
      </>
    </NoteModal>
  );
}
