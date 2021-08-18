import axios from "axios";

export async function storeUserAndToken(dispatch) {
  const token = localStorage.getItem("jwt_token");
  if (!token) return;
  dispatch({ type: "SET_JWT_TOKEN", payload: token });
  const response = await axios.get("/api/getuser", {
    headers: { jwt_token: token },
  });
  dispatch({ type: "SET_USER", payload: response.data });
}
