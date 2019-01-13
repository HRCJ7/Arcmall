// @flow
import {
  takeLatest,
  call,
  put,
} from 'redux-saga/effects';
import type {
  Saga,
} from 'redux-saga';
import Actions from '../actions/LoginActions';
import LoginService from '../services/LoginService';
import {
  LOGIN,
} from '../actions/Types';

export default () => {
  function* login(action) {
    try {
      const response = yield call(LoginService.login, action.payload.email, action.payload.password);
      yield put(Actions.loginSuccess(response));
      console.log(response)
    } catch (error) {
      yield put(Actions.loginFailure(error.response));
      console.log(error)
    }
  }

  function* watchLogin(): Saga<void> {
    yield takeLatest(LOGIN, login);
  }

  return {
    watchLogin,
  };
};
