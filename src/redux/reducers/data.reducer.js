import { types } from "../types";
const initialState = {
  screams: [],
  scream: {},
  loading: false
};

export const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case types.LOADING_DATA_COMPLETED:
      return {
        ...state,
        loading: false
      };
    case types.GET_SCREAMS_SUCCESS:
      return {
        ...state,
        screams: action.screams,
        loading: false
      };

    case types.DELETE_SCREAM_SUCCESS:
      let arr2 = state.screams.filter(
        scream => scream.screamId !== action.payload
      );

      return {
        ...state,
        screams: [...arr2]
      };

    case types.LIKE_SCREAM_SUCCESS:
    case types.UNLIKE_SCREAM_SUCCESS:
      let index = state.screams.findIndex(
        scream => scream.screamId === action.payload.screamId
      );
      state.screams[index] = action.payload;
      const arr = state.screams;
      return {
        ...state,
        screams: [...arr]
      };

    default:
      return { ...state };
  }
};
