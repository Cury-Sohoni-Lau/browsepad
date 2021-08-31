import React from "react";
import { useContext, useState, useEffect } from "react";
import { Context } from "../Store";
import { toBase64 } from "../utils";
import axios from "axios";

export default function Profile() {
  const [state] = useContext(Context);
  const defaultProfilePicture = "../profile-default.png";

  const handleUpload = async (e) => {
    const maxAllowedSize = 5 * 1024 * 1024;
    if (e.target.files[0].size > maxAllowedSize) {
      //display error
      return;
    }
    const imageB64 = await toBase64(e.target.files[0]);
    try {
      await axios.patch(
        "/api/users",
        { image: imageB64 },
        { headers: { Authorization: `Bearer ${state.token}` } }
      );
      window.location.reload();
    } catch {
      //display error
      return;
    }
  };

  return (
    <div>
      <div
        className="profile-pic-big circle-pic"
        style={{
          backgroundImage: `url(${state.user.image || defaultProfilePicture})`,
        }}
      ></div>
      {/* <button onClick={handleUpload}>Upload Photo</button> */}
      <input
        type="file"
        accept="image/png, image/jpeg"
        name="myImage"
        onChange={handleUpload}
      />
      <p>{state.user.name}</p>
      <p>{state.user.email}</p>
    </div>
  );
}
