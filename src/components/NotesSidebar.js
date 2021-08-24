import React, { useState, useContext, useEffect } from 'react'
import { Context } from "../Store"
import Button from "react-bootstrap/Button";
import { ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";
import { includesAll } from "../utils"

export default function NotesSidebar() {
  const [state, dispatch] = useContext(Context)
  const [searchText, setSearchText] = useState("");
  const [hashtagWords, setHashtagWords] = useState([])
  const [selectedHashtags, setSelectedHashtags] = useState([])
  const [selectedDropdown, setSelectedDropdown] = useState("")
  const handleChange = (e) => {
    setSearchText(e.target.value);
  }

  useEffect(() => {
    let filteredNotes = state.notes.filter((note) => {
      const text = searchText.toLowerCase()
      return note.title.toLowerCase().includes(text) || note.content.toLowerCase().includes(text) || note.url.toLowerCase().includes(text)
    })
    if (selectedHashtags.length > 0) {
      filteredNotes = filteredNotes.filter((note) => includesAll(note.hashtags, selectedHashtags))
    }
    dispatch({ type: "SET_FILTERED_NOTES", payload: filteredNotes })
  }, [searchText, selectedHashtags, dispatch, state.notes])

  useEffect(() => {
    reloadHashtags()
  }, [state.filteredNotes])

  useEffect(() => {
    let filteredNotes = state.filteredNotes;
    
    switch (selectedDropdown) {
      case '1':
        filteredNotes.sort((a,b) => (new Date(b.created_at)) - (new Date(a.created_at)) )
        break;
      case '2':
        filteredNotes.sort((a,b) => (new Date(a.created_at)) - (new Date(b.created_at)) )
        break;
      case '3':
        filteredNotes.sort((a,b) => (new Date(b.modified_at)) - (new Date(a.modified_at)) )
        break;
      case '4':
        filteredNotes.sort((a,b) => (new Date(a.modified_at)) - (new Date(b.modified_at)) )
        break;
      case "":
        break;

      default:
        console.log("no dropdown selected");
    }
    dispatch({ type: "SET_FILTERED_NOTES", payload: filteredNotes })
  }, [selectedDropdown])

  function reloadHashtags() {
    let uniqueHashtagWords = []
    state.filteredNotes.map(note => note.hashtags).flat().forEach(word => {
      if (!uniqueHashtagWords.includes(word)) {
        uniqueHashtagWords.push(word)
      }
    })
    uniqueHashtagWords = uniqueHashtagWords.sort()
    setHashtagWords(uniqueHashtagWords)
  }

  const toggleHashtag = (hashtag) => {
    if (!selectedHashtags.includes(hashtag)) {
      setSelectedHashtags(oldArray => [...oldArray, hashtag])
    } else {
      setSelectedHashtags(oldArray => oldArray.filter(element => element !== hashtag))
    }
  }

  const dropdownOptions = {
    1: "Created (newest to oldest)",
    2: "Created (oldest to newest)",
    3: "Modified (newest to oldest)",
    4: "Modified (oldest to newest)"
  }

  return (
    <div id="notes-sidebar">
      <p>Sort:</p>
      <DropdownButton as={ButtonGroup} title={dropdownOptions[selectedDropdown] || "Sort By"} id="bg-nested-dropdown" onSelect={(e) => setSelectedDropdown(e)}>
        <Dropdown.Item eventKey="">None</Dropdown.Item>
        <Dropdown.Item eventKey="1">{dropdownOptions[1]}</Dropdown.Item>
        <Dropdown.Item eventKey="2">{dropdownOptions[2]}</Dropdown.Item>
        <Dropdown.Item eventKey="3">{dropdownOptions[3]}</Dropdown.Item>
        <Dropdown.Item eventKey="4">{dropdownOptions[4]}</Dropdown.Item>
      </DropdownButton>
      <p>Search:</p>
      <input type="text" value={searchText} onChange={handleChange}></input>
      {/* DISPLAY HASHTAGS HERE YO */}
      <p>Hashtags:</p>
      {/* list of hastags */}
      {hashtagWords.map((hashtag) => (
        <Button key={hashtag} variant="outline-primary" className={selectedHashtags.includes(hashtag) ? "active" : ""} onClick={(e) => toggleHashtag(hashtag)}>{hashtag}</Button>
      ))}
    </div>
  )
}
