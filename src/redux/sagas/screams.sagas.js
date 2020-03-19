import { takeLatest, put, call, take, delay } from "redux-saga/effects";
import { types } from "../types";
import {
  getScreams,
  likeOrUnlikeScream,
  deleteScreamWithId
} from "../apiRequest";
import {
  getScreamsSuccess,
  getScreamsFaliure,
  loadingData,
  loadingCompleted
} from "../actions";

function* getAllScreams() {
  try {
    yield put(loadingData());
    const screams = yield call(getScreams);
    yield put(getScreamsSuccess(screams));
    yield put(loadingCompleted());
  } catch (err) {
    yield put(loadingCompleted());
    yield put(getScreamsFaliure(err.response.data));
  }
}

function* likeScream(action) {
  for (let i = 0; i < 5; i++) {
    try {
      const apiResponse = yield call(likeOrUnlikeScream, {
        screamId: action.screamId,
        like: true
      });
      yield put({ type: types.LIKE_SCREAM_SUCCESS, payload: apiResponse });
      return;
    } catch (err) {
      console.log(err);
      console.log("retry ", i + 1);
      if (i < 4) {
        yield delay(2000);
      }
    }
  }
  // attempts failed after 5 attempts
  throw new Error("API request failed");
}

export function* watchLikeScream() {
  yield takeLatest(types.LIKE_SCREAM, likeScream);
}

function* unlikeScream(action) {
  for (let i = 0; i < 5; i++) {
    try {
      const apiResponse = yield call(likeOrUnlikeScream, {
        screamId: action.screamId,
        like: false
      });
      yield put({ type: types.UNLIKE_SCREAM_SUCCESS, payload: apiResponse });
      return;
    } catch (err) {
      console.log(err);
      console.log("retry ", i + 1);
      if (i < 4) {
        yield delay(2000);
      }
    }
  }
  // attempts failed after 5 attempts
  throw new Error("API request failed");
}

function* deleteScream(action) {
  try {
    debugger
    const apiResponse = yield call(deleteScreamWithId, action.screamId);
    console.log("api response ", apiResponse);
    yield put({ type: types.DELETE_SCREAM_SUCCESS, payload: action.screamId });
  } catch (e) {
    console.log(e);
  }
}
export function* watchDeleteScream() {
  yield takeLatest(types.DELETE_SCREAM, deleteScream);
}

export function* watchUnlikeScream() {
  yield takeLatest(types.UNLIKE_SCREAM, unlikeScream);
}

export function* watchGetScreams() {
  yield takeLatest(types.GET_SCREAMS, getAllScreams);
}
