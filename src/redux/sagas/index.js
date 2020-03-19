import { all, take, select } from "redux-saga/effects";
import _ from "lodash";
import {
  watchLogin,
  watchSignup,
  watchGetUser,
  watchLogout,
  watchImageUpload,
  watchEditUser
} from "./user.saga";
import {
  watchGetScreams,
  watchLikeScream,
  watchUnlikeScream,
  watchDeleteScream
} from "./screams.sagas";

let globalState = {};

function difference(object, base) {
  function changes(object, base) {
    return _.transform(object, function(result, value, key) {
      if (!_.isEqual(value, base[key])) {
        result[key] =
          _.isObject(value) && _.isObject(base[key])
            ? changes(value, base[key])
            : value;
      }
    });
  }
  return changes(object, base);
}

function* watchAndLog() {
  while (true) {
    const action = yield take("*");
    const state = yield select();

    console.log("action fired", action.type);

    if (Object.keys(globalState).length > 0) {
      console.log("State changed at ", difference(state, globalState));
    }
    globalState = {
      ...state
    };
  }
}

export default function* rootSaga(someArg) {
  yield all([
    watchAndLog(),
    watchLogout(),
    watchGetUser(),
    watchLogin(),
    watchGetScreams(),
    watchSignup(),
    watchImageUpload(),
    watchEditUser(),
    watchLikeScream(),
    watchUnlikeScream(),
    watchDeleteScream()
  ]);
}
