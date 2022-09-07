import axios from "axios";

const show = () => axios.get("/preference");

const mail = ({ payload }) => axios.patch(`/preference/mail`, payload);

const update = ({ payload }) => axios.put("/preference", payload);

const preferencesApi = {
  show,
  update,
  mail,
};

export default preferencesApi;
