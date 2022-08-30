import axios from "axios";

const list = () => axios.get("/tasks");

const taskApi = { list };

export default taskApi;
