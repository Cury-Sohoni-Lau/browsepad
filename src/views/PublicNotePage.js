import React from "react";
import { useRouteMatch } from "react-router-dom";
import Note from "../components/Note";
import { Route } from "react-router-dom";

export default function NotesPage() {
  let parentMatch = useRouteMatch();

  return (
    <div>
      <Route
        path={`${parentMatch.url}/:noteID`}
        render={({ match }) => (
          <Note noteID={match.params.noteID} isPublicLink={true} />
        )}
      />
    </div>
  );
}
