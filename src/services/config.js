import axios from "axios";
import { getCookies } from "./cookiesService";

export const API_URL = "http://localhost:8080";

const getHeaders = () => ({
  Authorization: "Bearer " + getCookies("jwt"),
});

const makeRequest = (method, url, data, config = {}) => {
  const completeUrl = API_URL + url;
  const headers = getHeaders()

  return axios({
    method,
    url: completeUrl,
    data,
    headers,
    ...config,
  });
};

export const getWithHeaders = url => makeRequest("get", url);
export const postWithHeaders = (url, data) => makeRequest("post", url, data);
export const putWithHeaders = (url, data) => makeRequest("put", url, data);