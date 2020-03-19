import axios from "axios";
import { takeLatest, put, call } from "redux-saga/effects";
import { types } from "../types";

import {
  loginUser,
  getUserData,
  updateUserDetails,
  signup,
  uploadProfileImage
} from "../apiRequest";

import {
  setAuthanticated,
  setUnAuthanticated,
  loading,
  loadingCompleted,
  setUser,
  clearErrors,
  setErrors,
  loadingUser,
  editUserSuccess
} from "../actions";

import { history } from "../../utils/history";

const setAuthorization = token => {
  // setting the id token
  const FBidToken = `Bearer ${token}`;
  localStorage.setItem("FBidToken", FBidToken);
  axios.defaults.headers.common["Authorization"] = FBidToken;
};

function* userLogin(action) {
  try {
    yield put(loading());
    const loginRes = yield call(loginUser, action.user);

    setAuthorization(loginRes.token);

    // get user info
    yield getUser();
    yield put(loadingCompleted());

    // redirect to main page
    history.push("/");

    yield put(clearErrors());
    yield put(setAuthanticated());
  } catch (err) {
    yield put(loadingCompleted());
    // set errors
    yield put(setUnAuthanticated());
    if (err.response) yield put(setErrors(err.response.data));
  }
}

function* logoutUser() {
  try {
    localStorage.removeItem("FBidToken");
    delete axios.defaults.headers.common["Authorization"];
    yield put(setUnAuthanticated());
  } catch (e) {
    yield put(setUnAuthanticated());
    console.log(e);
  }
}

function* editUser(action) {
  try {
    put(loadingUser());
    yield call(updateUserDetails, action.userDetails);
    yield put(editUserSuccess());
  
    yield getUser();
  } catch (e) {
    console.log(e);
  }
}

function* signupUser(action) {
  try {
    yield put(loading());
    const signupRes = yield call(signup, action.user);

    // setting the id token
    setAuthorization(signupRes.token);

    // get user info
    yield getUser();
    yield put(loadingCompleted());

    // redirect to main page
    history.push("/");

    yield put(clearErrors());
    yield put(setAuthanticated());
  } catch (err) {
    yield put(loadingCompleted());
    // set errors
    yield put(setUnAuthanticated());
    if (err.response) yield put(setErrors(err.response.data));
  }
}

export function* getUser() {
  try {
    yield put(loadingUser());
    const user = yield call(getUserData);
    yield put(setUser(user));
  } catch (e) {
    yield put(setUser({}));
  }
}

export function* uploadImage(action) {
  try {
    yield put(loadingUser());
    const user = yield call(uploadProfileImage, action.file);
    yield getUser();
    yield put(loadingCompleted());
  } catch (e) {
    yield put(loadingCompleted());
    console.log(e);
    // yield put(setUser({}));
  }
}

export function* watchLogout() {
  yield takeLatest(types.USER_LOGOUT, logoutUser);
}

export function* watchEditUser() {
  yield takeLatest(types.EDIT_USER_DETAILS, editUser);
}
export function* watchImageUpload() {
  yield takeLatest(types.UPLOAD_IMAGE, uploadImage);
}

export function* watchSignup() {
  yield takeLatest(types.SIGNUP, signupUser);
}

export function* watchGetUser() {
  yield takeLatest(types.GET_USER, getUser);
}

export function* watchLogin() {
  yield takeLatest(types.LOGIN, userLogin);
}
