import React from "react";

export default function Note({ note }) {
  return (
    <div>
      <h3>{note.title}</h3>
      <p>{note.content}</p>
    </div>
  );
}
