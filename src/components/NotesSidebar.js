import React, { useState, useContext, useEffect } from "react";
import { Context } from "../Store";
import Button from "@material-ui/core/Button";
import { includesAll } from "../utils";
import useStyles from "../styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";

export default function NotesSidebar() {
  const classes = useStyles();
  const [state, dispatch] = useContext(Context);
  const [searchText, setSearchText] = useState("");
  const [hashtagWords, setHashtagWords] = useState([]);
  const [selectedHashtags, setSelectedHashtags] = useState([]);
  const [selectedDropdown, setSelectedDropdown] = useState("");
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    let filteredNotes = state.notes.filter((note) => {
      const text = searchText.toLowerCase();
      return (
        note.title.toLowerCase().includes(text) ||
        note.content.toLowerCase().includes(text)
      );
    });
    if (selectedHashtags.length > 0) {
      filteredNotes = filteredNotes.filter((note) =>
        includesAll(note.hashtags, selectedHashtags)
      );
    }
    dispatch({ type: "SET_FILTERED_NOTES", payload: filteredNotes });
  }, [searchText, selectedHashtags, dispatch, state.notes]);

  useEffect(() => {
    function reloadHashtags() {
      let uniqueHashtagWords = [];
      state.filteredNotes
        .map((note) => note.hashtags)
        .flat()
        .forEach((word) => {
          if (!uniqueHashtagWords.includes(word)) {
            uniqueHashtagWords.push(word);
          }
        });
      uniqueHashtagWords = uniqueHashtagWords.sort();
      setHashtagWords(uniqueHashtagWords);
    }
    reloadHashtags();
  }, [state.filteredNotes]);

  useEffect(() => {
    let filteredNotes = state.filteredNotes;

    switch (selectedDropdown) {
      case "1":
        filteredNotes.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        break;
      case "2":
        filteredNotes.sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at)
        );
        break;
      case "3":
        filteredNotes.sort(
          (a, b) => new Date(b.modified_at) - new Date(a.modified_at)
        );
        break;
      case "4":
        filteredNotes.sort(
          (a, b) => new Date(a.modified_at) - new Date(b.modified_at)
        );
        break;
      default:
        break;
    }
    dispatch({ type: "SET_FILTERED_NOTES", payload: filteredNotes });
  }, [selectedDropdown, dispatch]);

  const toggleHashtag = (hashtag) => {
    if (!selectedHashtags.includes(hashtag)) {
      setSelectedHashtags((oldArray) => [...oldArray, hashtag]);
    } else {
      setSelectedHashtags((oldArray) =>
        oldArray.filter((element) => element !== hashtag)
      );
    }
  };

  const dropdownOptions = {
    0: "None",
    1: "Created (newest to oldest)",
    2: "Created (oldest to newest)",
    3: "Modified (newest to oldest)",
    4: "Modified (oldest to newest)",
  };

  // const [anchorEl, setAnchorEl] = useState(null);

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  return (
    <>
      <div
        id="notes-sidebar"
        className={
          `${classes.frosty} ${classes.shadowWeak}` +
          " " +
          (state.showingSidebar ? classes.sidebar : classes.hiddenSidebar)
        }
      >
        <FormControl style={{ display: !state.showingSidebar && "none" }}>
          <Select
            displayEmpty
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={selectedDropdown}
            onChange={(e) => setSelectedDropdown(e.target.value)}
          >
            <MenuItem value="">
              <p>Sort by date</p>
            </MenuItem>
            <MenuItem value="1">{dropdownOptions[1]}</MenuItem>
            <MenuItem value="2">{dropdownOptions[2]}</MenuItem>
            <MenuItem value="3">{dropdownOptions[3]}</MenuItem>
            <MenuItem value="4">{dropdownOptions[4]}</MenuItem>
          </Select>
        </FormControl>
        <p style={{ marginTop: "2rem" }}></p>
        {/* <input type="text" value={searchText} onChange={handleChange}></input> */}
        <TextField
          style={{ display: !state.showingSidebar && "none" }}
          id="outlined-search"
          label="Search field"
          type="search"
          value={searchText}
          onChange={handleChange}
        />
        <p style={{ marginTop: "2rem" }}></p>
        <p>Hashtags:</p>
        <div style={{ minHeight: "10rem" }}>
          {hashtagWords.map((hashtag) => (
            <Button
              key={hashtag}
              className={`${classes.hashtagButtons} ${classes.button} ${
                selectedHashtags.includes(hashtag)
                  ? classes.hashtagButtonsActive
                  : ""
              }`}
              onClick={(e) => toggleHashtag(hashtag)}
            >
              {hashtag}
            </Button>
          ))}
        </div>
      </div>
    </>
  );
}
