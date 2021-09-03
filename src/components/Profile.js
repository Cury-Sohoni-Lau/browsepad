import React, { useRef } from "react";
import { useContext } from "react";
import { Context } from "../Store";
import { toBase64, host } from "../utils";
import Button from "@material-ui/core/Button";
import axios from "axios";
import useStyles from "../styles";

export default function Profile() {
  const [state] = useContext(Context);
  const defaultProfilePicture = "../profile-default.png";
  const classes = useStyles();
  const inputRef = useRef(null);

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
      window.location.reload();
    } catch {
      //display error
      return;
    }
  };

  const openInput = () => {
    inputRef.current.click();
  }

  const deleteImage = async () => {
    try {
      await axios.patch(`${host}/api/users`, { image: null }, { headers: { Authorization: `Bearer ${state.token}` } });
      window.location.reload();
    } catch (error) {
      return;
    }
  }

  return (
    <div>
      <p>Username: {state.user.name}</p>
      <div
        className="profile-pic-big circle-pic"
        style={{
          backgroundImage: `url(${state.user.image || defaultProfilePicture})`,
        }}
      ></div>
      {/* <button onClick={handleUpload}>Upload Photo</button> */}
      <input
      style={{display: "none"}}
      ref={inputRef}
        type="file"
        accept="image/png, image/jpeg"
        name="myImage"
        onChange={handleUpload}
      />
     <Button onClick={openInput} className={`${classes.button} ${classes.buttonPurple} ${classes.shadowWeak}`} style={{ marginTop: "1rem", marginBottom: "1rem" }}>Choose profile picture</Button> 
      <Button onClick={deleteImage} className={`${classes.button} ${classes.buttonPurple} ${classes.shadowWeak}`} style={{ marginTop: "1rem", marginBottom: "1rem" }}>Remove profile picture</Button>
    </div>
  );
}
