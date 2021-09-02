import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from "../Store";
import { FaPencilAlt } from "react-icons/fa";
import { host } from "../utils";
import NoteModal from "./ui/NoteModal";

export default function EditNoteForm({ handleOpen, variant, color }) {
  const [state, dispatch] = useContext(Context);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [content, setContent] = useState("");
  const [open, setOpen] = useState(false);

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
      openModalButtonText={<FaPencilAlt />}
      submitFormButtonText="Save Changes"
      handleOpen={handleOpen}
      handleSubmit={handleSubmit}
      variant={variant}
      color={color}
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
