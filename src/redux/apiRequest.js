import axios from "axios";
import { api } from "../constants";

const GET = "get";
const POST = "post";
const DELETE = "delete";
const UPDATE = "update";

export const loginUser = (userData = { email: "", password: "" }) => {
  return requestSender(POST, `/${api.LOGIN}`, userData);
};
export const signup = userData => {
  return requestSender(POST, `/${api.SIGNUP}`, userData);
};
export const getUserData = () => {
  return requestSender(GET, `/${api.USER}`);
};

export const getScreams = () => {
  return requestSender(GET, `/${api.SCREAMS}`);
};

export const updateUserDetails = userDetails => {
  return requestSender(POST, `/${api.USER}`, userDetails);
};

export const uploadProfileImage = file => {
  return requestSender(POST, `/${api.USER}/image`, file);
};

export const deleteScreamWithId = screamId => {
  return requestSender(DELETE, `/scream/${screamId}`);
};

export const likeOrUnlikeScream = obj => {
  return requestSender(
    GET,
    `/scream/${obj.screamId}/${obj.like ? "like" : "unlike"}`
  );
};

const requestSender = (type = GET, url, data = {}) => {
  return axios[type](url, data).then(res => res.data);
};
