import React, { useContext, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../Store";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import useStyles from "../styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Container from "@material-ui/core/Container";
import Hidden from "@material-ui/core/Hidden";
import { init } from "ityped";
import { host } from "../utils";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";

export default function HomePage() {
  const [state] = useContext(Context);
  const history = useHistory();
  const classes = useStyles();
  const textRef = useRef();

  useEffect(() => {
    init(textRef.current, {
      strings: [
        "Save that thought.",
        "Share with others.",
        "Make the web your canvas.",
        ,
      ],
      typeSpeed: 50,
      backDelay: 1000,
      backSpeed: 10,
      showCursor: true,
    });
  }, []);

  useEffect(() => {
    if (state.user.id) {
      history.push("/notes");
    }
  }, [state, history]);
  return (
    <>
      <div id="home" style={{ paddingTop: "8vh" }}>
        <Typography
          style={{ fontFamily: "Rubik" }}
          className={`${classes.title} ${classes.titleMargin}`}
          variant="h2"
        >
          Browsepad
        </Typography>
        <Typography className={classes.typewriter} variant="h5">
          <span ref={textRef}></span>
        </Typography>
        <div className={classes.parallax}></div>
        <Grid container className={classes.gridContainer} justify="center">
          <Grid item xs={12} sm={12} md={6}>
            <Card className={classes.card}>
              <div className={classes.cardDetails}>
                <CardContent>
                  <Typography component="h2" variant="h5">
                    Browsepad lets you write memos on web pages
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Add a note using our Chrome extension
                  </Typography>
                  <Typography variant="subtitle1" paragraph>
                    Look over here 👉🏼
                  </Typography>
                  <Typography variant="subtitle1" color="primary">
                    <CardActions>
                      <a
                        target="_blank"
                        href={`https://chrome.google.com/webstore/detail/browsepad-extension/efeaahemcgmapoodfaniiginekegkllj`}
                      >
                        Download
                      </a>
                    </CardActions>
                  </Typography>
                </CardContent>
              </div>
              {/* <Hidden xsDown> */}
              <CardMedia
                className={classes.cardMedia}
                image={"https://source.unsplash.com/random"}
              />
              {/* </Hidden> */}
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Card className={classes.card}>
              <div className={classes.cardDetails}>
                <CardContent>
                  <Typography
                    component="h2"
                    variant="h5"
                    // style={{ fontWeight: "bold" }}
                  >
                    Add, edit, and delete memos directly with our Chrome
                    extension or through our web app. Share memos with friends
                    and family.
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                  ></Typography>
                  <Typography variant="subtitle1" paragraph></Typography>
                  <Typography variant="subtitle1" color="primary">
                    <CardActions></CardActions>
                  </Typography>
                </CardContent>
              </div>
              <Hidden xsDown>
                <CardMedia
                  className={classes.cardMedia}
                  image={"https://source.unsplash.com/random"}
                />
              </Hidden>
            </Card>
          </Grid>
        </Grid>
        <Typography
          style={{ fontFamily: "Rubik" }}
          className={`${classes.teamTitle} ${classes.title}`}
          variant="h4"
        >
          Meet Our Team
        </Typography>
        <Grid
          container
          className={classes.gridContainer}
          style={{ paddingBottom: "20vh" }}
          justify="center"
        >
          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardContent
                style={{ width: "100%" }}
                className={classes.devContainer}
              >
                <div>
                  <Typography gutterBottom variant="h5" component="h2">
                    Felipe Cury
                  </Typography>
                  <Typography>Full stack web developer</Typography>
                </div>
                <div className={classes.box}>
                  <a
                    href="https://www.linkedin.com/in/flpcury/"
                    target="_blank"
                  >
                    <LinkedInIcon />
                  </a>
                  <a href="https://github.com/flpcury" target="_blank">
                    <GitHubIcon />
                  </a>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardContent
                style={{ width: "100%" }}
                className={classes.devContainer}
              >
                <div>
                  <Typography gutterBottom variant="h5" component="h2">
                    Rituraj Sohoni
                  </Typography>
                  <Typography>Full stack web developer</Typography>
                  {/* <Typography>Rubik's cube national champion</Typography> */}
                </div>
                <div className={classes.box}>
                  <a
                    href="https://www.linkedin.com/in/rituraj-sohoni/"
                    target="_blank"
                  >
                    <LinkedInIcon />
                  </a>
                  <a href="https://github.com/rituraj8503" target="_blank">
                    <GitHubIcon />
                  </a>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardContent
                style={{ width: "100%" }}
                className={classes.devContainer}
              >
                <div>
                  <Typography gutterBottom variant="h5" component="h2">
                    Michelle Lau
                  </Typography>
                  <Typography>Full stack web developer</Typography>
                </div>
                <div className={classes.box}>
                  <a
                    href="https://www.linkedin.com/in/michelledeniselau/"
                    target="_blank"
                  >
                    <LinkedInIcon />
                  </a>
                  <a href="https://github.com/mimzivvimzi" target="_blank">
                    <GitHubIcon />
                  </a>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <footer className={classes.footer}>
          <Container maxWidth="lg">
            <Typography variant="h6" align="center" gutterBottom>
              Browsepad
            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
              color="textSecondary"
              component="p"
            >
              📍Made in Japan
            </Typography>
          </Container>
        </footer>
      </div>
    </>
  );
}

/*
            <Grid item xs={12} sm={6} md={4}>
          <Card className={classes.root} variant="outlined">
            <CardContent>
              <Typography
                color="textSecondary"
                gutterBottom
              >
                Extension screenshot
                  </Typography>
              <Typography variant="h5" component="h2">
                Test
                  </Typography>
              <Typography className={classes.pos} color="textSecondary">
                Add a note using our Chrome extension
                  </Typography>
              <Typography variant="body2" component="p">
                It's really cool
                    <br />
              </Typography>
            </CardContent>
          </Card>
        </Grid>
*/
