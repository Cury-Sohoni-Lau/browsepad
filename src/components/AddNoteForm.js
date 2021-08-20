import { useState, useContext } from "react";
import { Context } from "../Store";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { FaPlus } from "react-icons/fa";

export default function AddNoteForm() {
  const [state] = useContext(Context);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async () => {
    await axios.post(
      "http://localhost:3000/api/notes",
      {
        title: title,
        content: content,
        user_id: state.user.id,
        url: url,
      },
      { headers: { Authorization: `Bearer ${state.token}` } }
    );
    setShow(false);
  };

  return (
    <>
      <Button>
        <FaPlus onClick={handleShow} />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>Title</h3>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
          <p>Content</p>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></input>
          <p>URL</p>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          ></input>
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
    </>
  );
}
