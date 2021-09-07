import React, { useRef, useContext, useEffect } from "react";
import { Context } from "../Store";
import { toBase64, host } from "../utils";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { useHistory } from "react-router-dom";
import useStyles from "../styles";

export default function Profile() {
  const [state, dispatch] = useContext(Context);
  const defaultProfilePicture = "../profile-default.png";
  const classes = useStyles();
  const inputRef = useRef(null);
  const history = useHistory();

  useEffect(() => {
    if (!state.token) {
      history.push("/");
    }
  }, [state.token]);

  const handleUpload = async (e) => {
    const maxAllowedSize = 5 * 1024 * 1024;
    if (e.target.files[0].size > maxAllowedSize) {
      //display error
      return;
    }
    const imageB64 = await toBase64(e.target.files[0]);
    try {
      await axios.patch(
        `${host}/api/users`,
        { image: imageB64 },
        { headers: { Authorization: `Bearer ${state.token}` } }
      );
      dispatch({ type: "SET_USER_PROFILE_PIC", payload: imageB64 });
    } catch {
      //display error
      return;
    }
  };

  const openInput = () => {
    inputRef.current.click();
  };

  const deleteImage = async () => {
    try {
      await axios.patch(
        `${host}/api/users`,
        { image: null },
        { headers: { Authorization: `Bearer ${state.token}` } }
      );
      dispatch({ type: "SET_USER_PROFILE_PIC", payload: null });
    } catch (error) {
      return;
    }
  };

  return (
    <>
      {state.token ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <p style={{ fontSize: "1.5rem" }}>Hello, {state.user.name}!</p>
          <div
            className="profile-pic-big circle-pic"
            style={{
              backgroundImage: `url(${
                state.user.image || defaultProfilePicture
              })`,
            }}
          ></div>
          {/* <button onClick={handleUpload}>Upload Photo</button> */}
          <input
            style={{ display: "none" }}
            ref={inputRef}
            type="file"
            accept="image/png, image/jpeg, image/gif"
            name="myImage"
            onChange={handleUpload}
          />
          <div style={{ display: "flex" }}>
            <Button
              onClick={openInput}
              className={`${classes.button} ${classes.buttonPurple} ${classes.shadowWeak}`}
              style={{
                marginTop: "1rem",
                marginBottom: "1rem",
                padding: "5px 25px",
                marginRight: "1rem",
              }}
            >
              Change
            </Button>
            <Button
              onClick={deleteImage}
              className={`${classes.button} ${classes.buttonPurple} ${classes.shadowWeak}`}
              style={{
                marginTop: "1rem",
                marginBottom: "1rem",
                padding: "5px 25px",
              }}
            >
              Remove
            </Button>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
