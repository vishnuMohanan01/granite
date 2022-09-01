import axios from "axios";

const signup = payload =>
  axios.post("/users", {
    user: payload,
  });

const authApi = {
  signup,
};

export default authApi;
