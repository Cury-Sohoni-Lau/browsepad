import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div>
      <Link to="/register">Sign up!</Link>
      <Link to="/login">Login</Link>
    </div>
  );
}
