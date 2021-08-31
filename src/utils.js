import axios from "axios";

export async function storeUserAndToken(dispatch) {
  let token = localStorage.getItem("jwt_token");
  if (!token) return;
  try {
    const response = await axios.get("/api/getuser", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const user = response.data;
    if (user.new_token) {
      token = user.new_token;
      localStorage.setItem("jwt_token", token);
    }
    dispatch({ type: "SET_JWT_TOKEN", payload: token });
    dispatch({ type: "SET_USER", payload: response.data });
  } catch (err) {
    // USER LOGGED IN, BUT TOKEN EXPIRED - REMOVE TOKEN FROM LOCAL STORAGE
    localStorage.setItem("jwt_token", "");
  }
}

export function extractHashtags(note) {
  const hashtags = note.content
    .split(/[ \n]+/)
    .filter((word) => word[0] === "#" && word.length > 1 && word[1] !== "#")
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

export function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}