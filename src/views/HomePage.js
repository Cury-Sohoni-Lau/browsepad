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
import Container from "@material-ui/core/Container";
import { init } from "ityped";

export default function HomePage() {
  const [state] = useContext(Context);
  const history = useHistory();
  const classes = useStyles();
  const textRef = useRef();

  useEffect(() => {
    init(textRef.current, {
      strings: [
        "Make the web your canvas",
        "Save that thought",
        "One-click memos with our Chrome extension",
        "Share with others",
      ],
      typeSpeed: 50,
      backDelay: 1000,
      backSpeed: 10,
      showCursor: true,
    });
  }, []);

  useEffect(() => {
    console.log(state.user.id);
    if (state.user.id) {
      history.push("/notes");
    }
  }, [state, history]);
  return (
    <>
      <div id="home">
        <Typography
          style={{ fontFamily: "Rubik" }}
          className={classes.title}
          variant="h3"
        >
          Browsepad
        </Typography>
        <Paper className={classes.homeBanner}>
          <Typography className={classes.typewriter} variant="h5">
            <span ref={textRef}></span>
          </Typography>
        </Paper>
        <main>
          <Grid
            container
            spacing={4}
            className={classes.gridContainer}
            justify="center"
          >
            <Grid item xs={12} sm={6} md={4}>
              <Card className={classes.root} variant="outlined">
                <CardContent>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  >
                    Word of the Day
                  </Typography>
                  <Typography variant="h5" component="h2">
                    Test
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    adjective
                  </Typography>
                  <Typography variant="body2" component="p">
                    well meaning and kindly.
                    <br />
                    {'"a benevolent smile"'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card className={classes.root} variant="outlined">
                <CardContent>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  >
                    Word of the Day
                  </Typography>
                  <Typography variant="h5" component="h2">
                    Test
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    adjective
                  </Typography>
                  <Typography variant="body2" component="p">
                    well meaning and kindly.
                    <br />
                    {'"a benevolent smile"'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          {/* <Container className={classes.cardGrid} maxWidth="md">
            <Grid
              container
              spacing={2}
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
            >
              <Grid item xs={12} sm={6} md={3}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe
                      the content.
                    </Typography>
                  </CardContent>
                </Card>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe
                      the content.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container> */}
        </main>
      </div>
    </>
  );
}
