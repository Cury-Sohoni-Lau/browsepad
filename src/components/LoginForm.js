import React, { useContext, useState } from "react";
import axios from "axios";
import { storeUserAndToken, host } from "../utils";
import { Context } from "../Store";
import { useHistory, Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default function LoginForm() {
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
            Login
          </Button>
        </Grid>
      </form>
      <p>
        New user?
        <Link to="/register" style={{ textDecoration: "none" }}>
          {" "}
          Create an account
        </Link>
      </p>
    </Grid>
  );
}
