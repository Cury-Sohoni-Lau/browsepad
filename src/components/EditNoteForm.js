import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {Context} from "../Store"


export default function EditNoteForm() {
    const [state, dispatch] = useContext(Context);
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("")
    const [content, setContent] = useState("");

    const handleClose = () => {
      dispatch({type: "TOGGLE_SHOW_EDIT_FORM"});
    }

    const handleSubmit = async (e) => {
      const id = state.selectedNote.id;
      const response = await axios.patch(`http://localhost:3000/api/notes/${id}`, {
        title: title,
        content: content,
        user_id: state.user.id,
        url: url
      },
      { headers: {Authorization: `Bearer ${state.token}` }})
      dispatch({type: "TOGGLE_SHOW_EDIT_FORM"});
    }

    useEffect(() => { 
      setTitle(state.selectedNote.title);
      setContent(state.selectedNote.content);
      setUrl(state.selectedNote.url)
    }, [state.selectedNote])

  return (
      <Modal show={state.showEditForm} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>Title</h3>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}></input>
          <p>Content</p>
          <input type="text" value={content} onChange={(e) => setContent(e.target.value)}></input>
          <p>URL</p>
          <input type="text" value={url} onChange={(e) => setUrl(e.target.value)}></input>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
  )
}
