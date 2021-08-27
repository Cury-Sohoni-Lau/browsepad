import React, { useState, useEffect, useContext } from 'react'
import SuggestedUser from "./SuggestedUser"
import axios from "axios";
import {Context} from "../Store";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function ShareModal( {note, setShowShareSuccess} ) {
  const [state] = useContext(Context)
  const [recipient, setRecipient] = useState("");
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [showShareModal, setShowShareModal] = useState(false)

  useEffect(() => {
    const getUsers = async () => {
      const response = await axios(`/api/users/shared`, { headers: { Authorization: `Bearer ${state.token}` }})
      setSuggestedUsers(response.data)
    }
    getUsers();
  }, [])

  const handleClose = () => {
      setShowShareModal(false)
  }

  const handleShare = async (user) => {
    const email = user ? user.email : recipient;
    try {
      await axios.post(
        `/api/notes/${note.id}/share`,
        { email },
        { headers: { Authorization: `Bearer ${state.token}` }})
        setShowShareModal(false)
        setShowShareSuccess(true)
        setTimeout(() => setShowShareSuccess(false), 3000);
    } catch {
      //TODO - show red box with error text
      console.log("User does not exist.")
    }
  }


  return (
    <>
    <Button onClick={() => setShowShareModal(true)}>Share</Button>
    <Modal show={showShareModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Share</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div id="share-modal">
        <input type="text" onChange={(e) => setRecipient(e.target.value)}/>
        {suggestedUsers.map(user => <SuggestedUser user={user} handleShare={handleShare} />)}
      </div>
      </Modal.Body>
      <Modal.Footer>
          <Button onClick={() => handleShare()}>
            Share note
          </Button>
      </Modal.Footer>
    </Modal>
    </>
  )
}
