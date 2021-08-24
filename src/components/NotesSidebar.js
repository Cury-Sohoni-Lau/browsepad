import React, { useState, useContext, useEffect } from 'react'
import { Context } from "../Store"
import Button from "react-bootstrap/Button";
import { includesAll } from "../utils"

export default function NotesSidebar() {
  const [state, dispatch] = useContext(Context)
  const [searchText, setSearchText] = useState("");
  const [hashtagWords, setHashtagWords] = useState([])
  const [selectedHashtags, setSelectedHashtags] = useState([])
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
  }, [searchText, selectedHashtags])

  useEffect(() => {
    reloadHashtags()
  }, [state.filteredNotes])

  const reloadHashtags = () => {
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

  return (
    <div id="notes-sidebar">
      <p>Search:</p>
      <input type="text" value={searchText} onChange={handleChange}></input>
      {/* DISPLAY HASHTAGS HERE YO */}
      <p>Hashtags:</p>
      {/* list of hastags */}
      {hashtagWords.map((hashtag) => (
        <Button variant="outline-primary" className={selectedHashtags.includes(hashtag) ? "active" : ""} onClick={(e) => toggleHashtag(hashtag)}>{hashtag}</Button>
      ))}
    </div>
  )
}
