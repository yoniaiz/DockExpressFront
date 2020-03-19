import { types } from "../types";

export const loading = () => ({
  type: types.LOADING_UI,
  loading: true
});

export const loadingCompleted = () => ({
  type: types.LOADING_UI,
  loading: false
});
export const setErrors = (errors) => ({
  type: types.SET_ERRORS,
  errors
});

export const clearErrors = () => ({
  type: types.CLEAR_ERRORS,
});
