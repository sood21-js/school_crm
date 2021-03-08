import { takeEvery, put, call } from "redux-saga/effects";
import {
  setLoadingAuth,
  AUTH_ACTION_TYPE,
  setAuth,
  setErrorAuth,
} from "./reducer";
import { fetchApi } from "#libs/net/fetch";
import config from "#src/config.app";
import { TResponse } from "../types/common_types";

export const loadAuthAction = (data: any) =>
  ({ type: AUTH_ACTION_TYPE.LOAD_AUTH, data } as const);

export function* loadAuth({ data }: ReturnType<typeof loadAuthAction>) {
  try {
    yield put(setLoadingAuth(true));
    const result: TResponse = yield call(fetchApi, data, config.url.login);
    console.log(result);
    if (result.success) {
      yield put(setAuth(result));
    }
  } catch {
    yield put(setErrorAuth({ message: "Ошибка сервера", data: null }));
  }
  yield put(setLoadingAuth(false));
}

export function* authSaga() {
  yield takeEvery(AUTH_ACTION_TYPE.LOAD_AUTH, loadAuth);
}
