import axios from "axios";
import { getToken } from "./auth";

export const api = axios.create({
  baseURL: "http://localhost:8000/api"
});

export const baseURL = "http://localhost:8000/api";

export const sendGet = async url => {
  return await axios.get(`${baseURL}${url}`).then(r => r.data)
                                        .catch(err => {
                                            console.log(err.response.data)
                                        });
}

export const sendPost = async (url, params) => {
  return await axios.post(`${baseURL}${url}`, params).then(r => r.data)
                                        .catch(err => {
                                            console.log(err.response.data)
                                        });
}

export const sendPut = async (url, params) => {
  return await axios.put(`${baseURL}${url}`, params).then(r => r.data)
                                        .catch(err => {
                                            console.log(err.response.data)
                                        });
}

export const sendDelete = async url => {
  return await axios.delete(`${baseURL}${url}`).then(r => r.data)
                                        .catch(err => {
                                            console.log(err.response.data)
                                        });
}

api.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});

