import { useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const showNotes = async () => {
    const notes = await axios.get("/notes");
    console.log(notes.data);
    return notes;
  };

  useEffect(() => {
    showNotes();
  }, []);

  return <div className="App"></div>;
}

export default App;
