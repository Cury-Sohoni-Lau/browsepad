import React, { useState, useEffect, useContext } from "react";
import SuggestedUser from "./SuggestedUser";
import axios from "axios";
import { Context } from "../Store";
import Button from "@material-ui/core/Button";
import { host } from "../utils";
import NoteModal from "./ui/NoteModal";
import ShareIcon from "@material-ui/icons/Share";
import useStyle from "../styles";
import TextField from "@material-ui/core/TextField";

export default function ShareModal({ note }) {
  const classes = useStyle();
  const [state] = useContext(Context);
  const [recipient, setRecipient] = useState("");
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [generatedLink, setGeneratedLink] = useState("");
  const [showShareFailure, setShowShareFailure] = useState(false);
  const [open, setOpen] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [showShareSuccess, setShowShareSuccess] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      const response = await axios(`${host}/api/users/shared`, {
        headers: { Authorization: `Bearer ${state.token}` },
      });
      setSuggestedUsers(response.data);
    };
    getUsers();
  }, [state.token]);

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
    if (!showEmailInput && !user) {
      setShowEmailInput(true);
      return;
    }
    const email = user ? user.email : recipient;
    try {
      await axios.post(
        `${host}/api/notes/${note.id}/share`,
        { email },
        { headers: { Authorization: `Bearer ${state.token}` } }
      );
      shareSuccess();
    } catch {
      // TODO - show red box with error text
      // DISPLAY TEXT ABOVE THE EMAIL INPUT BOX
      setShowShareFailure(true);
      console.log("User does not exist.");
    }
  };

  const shareSuccess = () => {
    setShowShareSuccess(true);
    setTimeout(() => {
      setShowShareSuccess(false);
      setOpen(false);
      setShowEmailInput(false);
    }, 2000);
  };

  return (
    <NoteModal
      open={open}
      setOpen={setOpen}
      openModalButtonText={<ShareIcon />}
      handleSubmit={handleShare}
      className={`${classes.purple} ${classes.whiteTextButton}`}
    >
      {showShareSuccess && <p>You shared a note!</p>}
      {generatedLink ? (
        <>
          <p>Link to this note:</p>
          <TextField
            className={classes.formInput}
            label="Your link"
            type="text"
            value={generatedLink}
          />
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
          {showEmailInput && (
            <TextField
              className={classes.formInput}
              label="User's email"
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          )}
          <div style={{ marginTop: "1rem" }}>
            <Button
              className={`${classes.button} ${classes.buttonPurple} ${classes.shadowStrong}`}
              onClick={() => handleShare()}
            >
              {showEmailInput ? "Share" : "Share with a user"}
            </Button>
            {!showEmailInput && (
              <Button
                className={`${classes.button} ${classes.buttonPurple} ${classes.shadowStrong}`}
                onClick={generateShareableLink}
              >
                Get shareable link
              </Button>
            )}
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
  );
}
