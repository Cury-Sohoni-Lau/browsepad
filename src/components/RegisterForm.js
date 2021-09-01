import React, { useContext } from "react";
import { useState } from "react";
import axios from "axios";
import { storeUserAndToken, host } from "../utils";
import { Context } from "../Store";
import { useHistory, Link } from "react-router-dom";
import { isPasswordValid } from "../utils";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

export default function RegisterForm() {
  const [, dispatch] = useContext(Context);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidden, setHidden] = useState(true);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isPasswordValid(password)) {
      setHidden(false);
      return;
    }
    const response = await axios.post(`${host}/api/register`, {
      name,
      email,
      password,
    });
    localStorage.setItem("jwt_token", response.data.jwtToken);
    storeUserAndToken(dispatch);
    history.push("/notes");
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh" }}
    >
      <form onSubmit={handleSubmit}>
        <Grid item xs>
          <TextField
            style={{ minWidth: "50vw" }}
            label="name"
            variant="filled"
            type="text"
            placeholder="Bob"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item xs>
          <TextField
            style={{ minWidth: "50vw" }}
            label="Email"
            variant="filled"
            type="email"
            placeholder="user@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs>
          <TextField
            style={{ minWidth: "50vw" }}
            label="Password"
            variant="filled"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs>
          <Button type="submit" onClick={handleSubmit}>
            Register
          </Button>
        </Grid>
      </form>
      <p>
        Already have an account?
        <Link to="/login" style={{ textDecoration: "none" }}>
          {" "}
          Login
        </Link>
      </p>
    </Grid>
  );
}
