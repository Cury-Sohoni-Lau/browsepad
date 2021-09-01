import React from "react";
import makeStyles from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #8860D0, #84CEEB)",
    border: 0,
    marginBottom: 15,
    borderRadius: 100,
    color: "white",
    padding: "5px 30px",
  },
});

export default function ButtonStyled() {
  const classes = useStyles();
  return (
    <Button id="test" className={classes.root}>
      Login
    </Button>
  );
}
