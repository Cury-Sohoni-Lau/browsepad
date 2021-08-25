import React, { useContext } from "react";
import { useState } from "react";
import axios from "axios";
import { storeUserAndToken } from "../utils";
import { Context } from "../Store";
import { useHistory, Link } from "react-router-dom";
import { Card, Form, Button } from "react-bootstrap";
import { isPasswordValid } from "../utils";

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
    const response = await axios.post(`/api/register`, {
      name,
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
        <Card.Title className="text-center">Register</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label className="mx-auto my-2">Name</Form.Label>
            <Form.Control
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
            <div id="invalid-password" className={hidden ? "hidden" : ""}>
              Password must contain a minimum of eight characters, at least one
              uppercase letter, one lowercase letter, one number and one special
              character
            </div>
          </Form.Group>
          <Button type="submit" className="mx-auto my-2">
            Submit
          </Button>
          <p>
            Already have an account?
            <Link to="/login" style={{ textDecoration: "none" }}>
              {" "}
              Login
            </Link>
          </p>
        </Form>
      </Card.Body>
    </Card>
  );
}
