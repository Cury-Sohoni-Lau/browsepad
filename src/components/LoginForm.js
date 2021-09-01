import React, { useContext, useState } from "react";
import axios from "axios";
import { storeUserAndToken, host } from "../utils";
import { Context } from "../Store";
import { useHistory, Link } from "react-router-dom";
import { Card, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

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
    <Card style={{ width: "20rem", margin: "0 auto" }} className="test">
      <Card.Body>
        <Card.Title className="text-center">Login</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label className="mx-auto my-2">Email</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Label className="mx-auto my-2">Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" className="mx-auto my-2">
            Submit
          </Button>
          <p>
            New user?
            <Link to="/register" style={{ textDecoration: "none" }}>
              {" "}
              Create an account
            </Link>
          </p>
        </Form>
      </Card.Body>
    </Card>
  );
}
