import { types } from "../types";
const initialState = {
  login: {},
  authanticated: false,
  loading: false,
  credentials: {},
  likes: [],
  notifications: []
};
export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_AUTHENTICATED:
      return {
        ...state,
        authanticated: true
      };

    case types.SET_UNAUTHENTICATED:
      return initialState;

    case types.SET_USER:
      return {
        ...state,
        authanticated: true,
        ...action.user,
        loading: false
      };

    case types.LOGIN_ERROR:
      return {
        ...state,
        authanticated: false
      };
    case types.LOADING_USER:
      return {
        ...state,
        loading: true
      };
    case types.LIKE_SCREAM_SUCCESS:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userHandle: state.credentials.handle,
            screamId: action.payload.screamId
          }
        ]
      };
    case types.UNLIKE_SCREAM_SUCCESS:
      return {
        ...state,
        likes: state.likes.filter(like => like.screamId !== action.payload.screamId)
      };

    default:
      return { ...state };
  }
};
