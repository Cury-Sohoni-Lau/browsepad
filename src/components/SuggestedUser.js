import React from 'react'

export default function SuggestedUser({user, handleShare}) {
  return (
    <div class="suggested-user" onClick={() => handleShare(user)}>
      <p>{user.name}</p>
      <p>{user.email}</p>
    </div>
  )
}
