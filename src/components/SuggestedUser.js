import React from 'react'
import Button from "react-bootstrap/Button"

export default function SuggestedUser({ user, handleShare }) {
  return (
    <Button className="button-user" onClick={() => handleShare(user)}>
      <p>{user.name} - {user.email}</p>
    </Button>
  )
}
