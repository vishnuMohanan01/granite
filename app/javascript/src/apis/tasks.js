import axios from "axios";

const list = () => axios.get("/tasks");
const create = payload =>
  axios.post("/tasks", {
    task: payload,
  });
const show = slug => axios.get(`/tasks/${slug}`);

const taskApi = {
  list,
  create,
  show,
};

export default taskApi;
