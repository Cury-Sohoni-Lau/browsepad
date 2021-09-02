import React from 'react'
import Button from "@material-ui/core/Button"

export default function SuggestedUser({ user, handleShare }) {
  return (
    <Button className="button-user" onClick={() => handleShare(user)}>
      <p>{user.name} - {user.email}</p>
    </Button>
  )
}
