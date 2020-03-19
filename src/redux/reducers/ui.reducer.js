import { types } from "../types";
const initialState = {
  errors: {},
  loading: false
};
export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CLEAR_ERRORS:
      return {
        ...state,
        errors: {}
      };
    case types.SET_ERRORS:
      return {
        ...state,
        errors: action.errors
      };
    case types.LOADING_UI:
      return {
        ...state,
        loading: action.loading
      };
    default:
      return { ...state };
  }
};
