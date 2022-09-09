import axios from "axios";

const list = () => axios.get("/tasks");
const create = payload =>
  axios.post("/tasks", {
    task: payload,
  });
const show = slug => axios.get(`/tasks/${slug}`);
const update = ({ slug, payload, quiet = false }) => {
  const path = quiet ? `/tasks/${slug}?quiet` : `/tasks/${slug}`;
  return axios.put(path, {
    task: payload,
  });
};
const destroy = ({ slug, quiet = false }) => {
  const path = quiet ? `/tasks/${slug}?quiet` : `/tasks/${slug}`;
  return axios.delete(path);
};
const generatePdf = () => axios.post("/tasks/report", {});
const download = () =>
  axios.get("/tasks/report/download", { responseType: "blob" });

const taskApi = {
  list,
  create,
  show,
  update,
  destroy,
  generatePdf,
  download,
};

export default taskApi;
