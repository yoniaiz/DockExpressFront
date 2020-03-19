import { types } from "../types";

export const getScreams = () => ({
  type: types.GET_SCREAMS
});

export const getScreamsSuccess = screams => ({
  type: types.GET_SCREAMS_SUCCESS,
  screams
});

export const getScreamsFaliure = errors => ({
  type: types.GET_SCREAMS_FALIURE
});

export const loadingData = () => ({
  type: types.LOADING_DATA
});
export const loadingDataCompleter = () => ({
  type: types.LOADING_DATA_COMPLETED
});

export const likeScream = screamId => {
  return {
    type: types.LIKE_SCREAM,
    screamId
  };
};

export const unlikeScream = screamId => ({
  type: types.UNLIKE_SCREAM,
  screamId
});

export const deleteScream = screamId => ({
  type: types.DELETE_SCREAM,
  screamId
});
