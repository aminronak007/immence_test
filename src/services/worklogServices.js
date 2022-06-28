import { api, handleResponse, handleError } from "./apiServices";

export const addWorklog = (data) =>
  api()
    .post("/api/v1/worklog/add", data)
    .then(handleResponse)
    .catch(handleError);

export const worklogsList = () =>
  api().get("/api/v1/worklogs/list").then(handleResponse).catch(handleError);
