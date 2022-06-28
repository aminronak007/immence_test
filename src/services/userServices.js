import { api, handleResponse, handleError } from "./apiServices";

export const addUser = (data) =>
  api().post("/api/v1/user/add", data).then(handleResponse).catch(handleError);

export const userList = () =>
  api().get("/api/v1/user/list").then(handleResponse).catch(handleError);
