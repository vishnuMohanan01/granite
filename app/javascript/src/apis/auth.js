import axios from "axios";

const signup = payload =>
  axios.post("/users", {
    user: payload,
  });

const login = payload =>
  axios.post("/session", {
    login: payload,
  });

const logout = () => axios.delete("/session");

const authApi = {
  login,
  signup,
  logout,
};

export default authApi;
