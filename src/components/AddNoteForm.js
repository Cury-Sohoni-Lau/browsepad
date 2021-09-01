import { useState, useContext } from "react";
import { Context } from "../Store";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import { host } from "../utils";
import NoteModal from "./ui/NoteModal";

export default function AddNoteForm() {
  const [state, dispatch] = useContext(Context);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

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
      openModalButtonText={<FaPlus />}
      submitFormButtonText="Save Changes"
      handleSubmit={handleSubmit}
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
