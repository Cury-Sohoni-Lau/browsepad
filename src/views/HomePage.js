import React, { useContext, useEffect, useRef} from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../Store";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import useStyles from "../styles"
import { init } from 'ityped'

export default function HomePage() {
  const [state] = useContext(Context);
  const history = useHistory();
  const classes = useStyles();
  const textRef = useRef();
    
  useEffect(() => {
      init(textRef.current, {
           strings: ["Make the web your canvas", "Save that thought", "One-click memos with our Chrome extension", "Share with others"],
           typeSpeed: 50,
           backDelay: 1000,
           backSpeed: 10,
           showCursor: true, 
          })
  }, [])

  useEffect(() => {
    console.log(state.user.id);
    if (state.user.id) {
      history.push("/notes");
    }
  }, [state, history]);
  return (
    <>
      <div id="home">
        <div className={classes.overlay} />
          <Typography style={{ fontFamily: "Rubik" }} className={classes.title} variant="h3">Browsepad</Typography>
          <Paper className={classes.homeBanner} >
          <Typography className={classes.typewriter} variant="h5"><span ref={textRef}></span></Typography>
        </Paper>
      </div>
    </>
  );
}