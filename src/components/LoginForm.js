import React, { useContext, useState } from "react";
import axios from "axios";
import { storeUserAndToken, host } from "../utils";
import { Context } from "../Store";
import { useHistory, Link } from "react-router-dom";
// import { Card, Button, Form } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import TextField from '@material-ui/core/TextField'
// import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
// import { teal } from "@material-ui/core/colors"

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

  function ButtonStyled() {
    const classes = useStyles();
    return (
      <Button id="test" className={classes.root} onClick={handleSubmit}>
        Login
      </Button>
    );
  }

  return (
    <div id="login-box">
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          variant="filled"
          type="email"
          placeholder="user@example.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          variant="filled"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <ButtonStyled onClick={handleSubmit} />
      </form>
      <p>
        New user?
        <Link to="/register" style={{ textDecoration: "none" }}>
          {" "}
          Create an account
        </Link>
      </p>
    </div>

    // <Card style={{ width: "20rem", margin: "0 auto" }} className="test">
    //   <Card.Body>
    //     <Card.Title className="text-center">Login</Card.Title>
    //     <Form onSubmit={handleSubmit}>
    //       <Form.Group>
    //         <Form.Label className="mx-auto my-2">Email</Form.Label>
    //         <Form.Control
    //           name="email"
    //           type="email"
    //           placeholder="example@gmail.com"
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //         />
    //         <Form.Label className="mx-auto my-2">Password</Form.Label>
    //         <Form.Control
    //           name="password"
    //           type="password"
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //         />
    //       </Form.Group>
    //       <Button type="submit" className="mx-auto my-2">
    //         Submit
    //       </Button>

    //     </Form>
    //   </Card.Body>
    // </Card>
  );
}
