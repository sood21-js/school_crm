import { all } from 'redux-saga/effects';
import { authSaga } from './auth/saga';

export function* rootSaga() {
  yield all([
    authSaga(),
  ]);
}
