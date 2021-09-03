import React from 'react'
import Button from "@material-ui/core/Button"
import useStyles from "../styles";

export default function SuggestedUser({ user, handleShare }) {
  const classes = useStyles();
  return (
    <Button style={{marginTop: "1rem"}} className={`${classes.button} ${classes.shadowStrong}`} onClick={() => handleShare(user)}>
      {user.name} - {user.email}
    </Button>
  )
}
