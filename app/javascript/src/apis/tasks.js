import axios from "axios";

const list = () => axios.get("/tasks");
const create = payload =>
  axios.post("/tasks", {
    task: payload,
  });

const taskApi = {
  list,
  create,
};

export default taskApi;
