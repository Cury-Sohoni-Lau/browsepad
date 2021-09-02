import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../Store";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});



export default function TabButtons() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [state, dispatch] = useContext(Context);

  const toggleSharedNotes = () => {
    if (state.showingSharedNotes) {
      dispatch({ type: "SET_NOTES", payload: state.myNotes });
      dispatch({ type: "SET_SHOWING_SHARED_NOTES", payload: false });
    } else {
      dispatch({ type: "SET_NOTES", payload: state.sharedNotes });
      dispatch({ type: "SET_SHOWING_SHARED_NOTES", payload: true });
    }
    handleChange();
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={toggleSharedNotes}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="My Notes" />
        <Tab label="Shared Notes" />
      </Tabs>
    </Paper>
  );
}
