import { types } from "../types";

export const login = user => ({
  type: types.LOGIN,
  user
});

export const signup = user => ({
  type: types.SIGNUP,
  user
});

export const loadingUser = () => ({
  type: types.LOADING_USER
});

export const uploadImage = file => ({
  type: types.UPLOAD_IMAGE,
  file
});

export const getUser = () => ({
  type: types.GET_USER
});

export const loginSuccess = () => ({
  type: types.LOGIN_SUCCESS
});

export const setAuthanticated = user => ({
  type: types.SET_AUTHENTICATED,
  user
});

export const setUnAuthanticated = () => ({
  type: types.SET_UNAUTHENTICATED
});

export const setUser = user => ({
  type: types.SET_USER,
  user
});

export const logout = () => ({
  type: types.USER_LOGOUT
});

export const loginError = errors => ({
  type: types.LOGIN_ERROR,
  errors
});

export const editUserDetails = userDetails => ({
  type: types.EDIT_USER_DETAILS,
  userDetails
});

export const editUserSuccess = userDetails => ({
  type: types.EDIT_USER_DETAILS_SUCCESS,
  userDetails
});
