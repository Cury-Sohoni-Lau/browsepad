import axios from "axios";

export async function storeUserAndToken(dispatch) {
  const token = localStorage.getItem("jwt_token");
  if (!token) return;
  dispatch({ type: "SET_JWT_TOKEN", payload: token });
  const response = await axios.get("/api/getuser", {
    headers: { Authorization: `Bearer ${token}` },
  });
  dispatch({ type: "SET_USER", payload: response.data });
}

export function extractHashtags(note) {
  const hashtags = note.content
    .split(" ")
    .filter((word) => word[0] === "#")
    .map((h) => h.toLowerCase());
  return hashtags;
}

export function includesAll(arr1, arr2) {
  let flag = true;
  for (let i = 0; i < arr2.length; i++) {
    if (!arr1.includes(arr2[i])) {
      flag = false;
      break;
    }
  }
  return flag;
}

export function isPasswordValid(password) {
  // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
  const regex =
    /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/;

  // if the regex produces any match with the password, return true
  return password.match(regex) !== null;
}
