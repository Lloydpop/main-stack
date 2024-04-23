import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const baseURL = "https://fe-task-api.mainstack.io";
const createHttp = (): AxiosInstance => {
  const defaultConfig: AxiosRequestConfig = {
    baseURL,
    headers: {},
    withCredentials: false,
    responseType: "json",
  };

  return axios.create(defaultConfig);
};

const http = createHttp();
export default http;
