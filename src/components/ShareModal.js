import React, { useState, useEffect, useContext } from "react";
import SuggestedUser from "./SuggestedUser";
import axios from "axios";
import { Context } from "../Store";
import Button from "@material-ui/core/Button";
import { host } from "../utils";
import NoteModal from "./ui/NoteModal";
import ShareIcon from "@material-ui/icons/Share";
import useStyle from "../styles";

export default function ShareModal({ note, setShowShareSuccess }) {
  const classes = useStyle();
  const [state] = useContext(Context);
  const [recipient, setRecipient] = useState("");
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [showShareModal, setShowShareModal] = useState(false);
  const [generatedLink, setGeneratedLink] = useState("");
  const [showShareFailure, setShowShareFailure] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      const response = await axios(`${host}/api/users/shared`, {
        headers: { Authorization: `Bearer ${state.token}` },
      });
      setSuggestedUsers(response.data);
    };
    getUsers();
  }, [state.token]);

  const handleClose = () => {
    setShowShareModal(false);
    setGeneratedLink("");
    setShowShareFailure(false);
  };

  const generateShareableLink = async () => {
    try {
      await axios.post(
        `${host}/api/notes/share/${note.id}`,
        { public: true },
        { headers: { Authorization: `Bearer ${state.token}` } }
      );
      setGeneratedLink(`${host}/note/${note.id}`);
    } catch (error) {
      //TODO - show red box with error text
      console.log("COULDNT SHARE.");
    }
  };

  const handleShare = async (user) => {
    const email = user ? user.email : recipient;
    try {
      await axios.post(
        `${host}/api/notes/${note.id}/share`,
        { email },
        { headers: { Authorization: `Bearer ${state.token}` } }
      );
      setShowShareSuccess(true);
      setTimeout(() => setShowShareSuccess(false), 3000);
      setOpen(false);
    } catch {
      // TODO - show red box with error text
      // DISPLAY TEXT ABOVE THE EMAIL INPUT BOX
      setShowShareFailure(true);
      console.log("User does not exist.");
    }
  };

  return (
    <NoteModal
      open={open}
      setOpen={setOpen}
      openModalButtonText={<ShareIcon />}
      handleSubmit={handleShare}
      className={`${classes.purple} ${classes.whiteTextButton}`}
    >
      {generatedLink ? (
        <>
          <p>Link to this note:</p>
          <input value={generatedLink}></input>
          <Button
            className={`${classes.button} ${classes.buttonPurple} ${classes.shadowStrong}`}
            onClick={() => {
              navigator.clipboard.writeText(generatedLink);
            }}
          >
            Copy
          </Button>
        </>
      ) : (
        <div
          id="share-modal"
          className={classes.formInput}
          style={{ display: "flex", alignItems: "center" }}
        >
          {showShareFailure ? <p>Unable to share with that account</p> : ""}
          <input
            className={classes.formInput}
            type="text"
            onChange={(e) => setRecipient(e.target.value)}
          />
          <div style={{ marginTop: "1rem" }}>
            <Button
              className={`${classes.button} ${classes.buttonPurple} ${classes.shadowStrong}`}
              onClick={() => {
                navigator.clipboard.writeText(generatedLink);
              }}
              onClick={() => handleShare()}
            >
              Share with email
            </Button>
            <Button
              className={`${classes.button} ${classes.buttonPurple} ${classes.shadowStrong}`}
              onClick={() => {
                navigator.clipboard.writeText(generatedLink);
              }}
              onClick={generateShareableLink}
            >
              Get shareable link
            </Button>
          </div>
          {suggestedUsers.map((user) => (
            <SuggestedUser
              key={user.email}
              user={user}
              handleShare={handleShare}
            />
          ))}
        </div>
      )}
    </NoteModal>
    // <>
    //   <Button onClick={() => setShowShareModal(true)}>Share</Button>
    //   <Modal show={showShareModal} onHide={handleClose}>
    //     <Modal.Header closeButton>
    //       <Modal.Title>Share</Modal.Title>
    //     </Modal.Header>
    //     <Modal.Body>
    //       {generatedLink ? (
    //         <p>
    //           Link to this note: <a href={generatedLink}>{generatedLink}</a>
    //         </p>
    //       ) : (
    //         <div id="share-modal">
    //           {showShareFailure ? <p>Unable to share with that account</p> : ""}
    //           <input
    //             type="text"
    //             onChange={(e) => setRecipient(e.target.value)}
    //           />
    //           <Button onClick={() => handleShare()}>Share with email</Button>
    //           <Button onClick={generateShareableLink}>
    //             Get shareable link
    //           </Button>
    //           {suggestedUsers.map((user) => (
    //             <SuggestedUser user={user} handleShare={handleShare} />
    //           ))}
    //         </div>
    //       )}
    //     </Modal.Body>
    //     <Modal.Footer></Modal.Footer>
    //   </Modal>
    // </>
  );
}
