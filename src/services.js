import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://dogsapi.origamid.dev/json",
  common: {
    "Content-Type": "application/json",
  },
});

export const api = {
  get: (endpoint, config) => axiosInstance.get(endpoint, config),
  post: (endpoint, body, c) => axiosInstance.post(endpoint, body, c),
  delete: (endpoint, c) => axiosInstance.delete(endpoint, c),
};
