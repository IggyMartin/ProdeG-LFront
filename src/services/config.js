import axios from "axios";

export const API_URL = "http://localhost:8080";

const makeRequest = (method, url, data, config = {}) => {
  const completeUrl = API_URL + url;

  return axios({
    method,
    url: completeUrl,
    data,
    ...config,
  });
};

export const getWithHeaders = url => makeRequest("get", url);
export const postWithHeaders = (url, data) => makeRequest("post", url, data);