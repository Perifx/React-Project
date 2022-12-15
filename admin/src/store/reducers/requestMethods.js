import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

// const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
//   .currentUser.accessToken;
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNjY5ODBjMDAwNzcwNDRmZTZlMjZmMiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2ODcyMTM2NCwiZXhwIjoxNjY4OTgwNTY0fQ.rF_oOxgjS9R_jYVigaUS72LqnLbDQAG7XgHiXdMcLhU";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
