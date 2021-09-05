import React, { useContext, useState } from "react";
import axios from "axios";
import { storeUserAndToken, host } from "../utils";
import { Context } from "../Store";
import { useHistory, Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import useStyles from "../styles";

export default function LoginForm() {
  const classes = useStyles();
  const [, dispatch] = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(`${host}/api/login`, {
      email,
      password,
    });
    localStorage.setItem("jwt_token", response.data.jwtToken);
    await storeUserAndToken(dispatch);
    history.push("/notes");
  };

  return (
    <Container
      maxWidth="sm"
      className={`${classes.authForm} ${classes.shadowWeak}`}
      style={{ marginTop: "3rem" }}
    >
      <form onSubmit={handleSubmit}>
        <Container className={classes.flexColumnContainer}>
          <TextField
            style={{ marginTop: "2rem" }}
            className={classes.authFormField}
            label="Email"
            variant="filled"
            type="email"
            placeholder="user@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            style={{ marginTop: "0.5rem" }}
            className={classes.authFormField}
            label="Password"
            variant="filled"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            className={`${classes.button} ${classes.buttonPurple} ${classes.shadowWeak}`}
            style={{
              marginTop: "1rem",
              marginBottom: "1rem",
              padding: "5px 25px",
            }}
            type="submit"
            onClick={handleSubmit}
          >
            Login
          </Button>
          <p>
            New user?{" "}
            <Link to="/register" style={{ textDecoration: "none" }}>
              Create an account
            </Link>
          </p>
        </Container>
      </form>
    </Container>

    // <Grid
    //   container
    //   spacing={0}
    //   direction="column"
    //   alignItems="center"
    //   justify="center"
    //   style={{ minHeight: "100vh" }}
    // >
    //   <form onSubmit={handleSubmit}>
    //     <Grid item xs>

    //     </Grid>
    //     <Grid item xs>

    //     </Grid>

    //   </form>

    // </Grid>
  );
}
