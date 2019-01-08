// @flow
import {all, fork} from 'redux-saga/effects';
import type {Saga} from 'redux-saga';

import loginSaga from '../modules/login/sagas/LoginSaga';

export default function* root(): Saga<void> {
  const createdloginSaga = loginSaga();

  yield all([
    fork(createdloginSaga.watchGetLoginVerification),
    // fork(createdloginSaga.watchLogOut),
    // fork(createdloginSaga.watchPlayerRegistration),
  ]);
}
