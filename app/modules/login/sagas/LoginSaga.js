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
  LOGIN, REGISTRATION,
} from '../actions/Types';
import { COOKIE_PHPSSID, COOKIE_LANGUAGE, COOKIE_CURENCY } from '../../../Constants';
import CartActions from '../../cart/actions/CartActions';

export default () => {
  function* login(action) {
    try {
      const response = yield call(LoginService.login, action.payload.email, action.payload.password);
      yield put(Actions.loginSuccess(response));
    } catch (error) {
      yield put(Actions.loginFailure(error.response));
    }
  }

  function* watchLogin(): Saga<void> {
    yield takeLatest(LOGIN, login);
  }

  function* register(action) {
    try {
      const response = yield call(LoginService.register, action.payload);
      let resposeErr = null;
      for (let key in response) {
        let error = key.split('_');
        if (error[0] === 'error') {
          if(response[key] instanceof String && response[key] !== '') {
            resposeErr = resposeErr? resposeErr: {};
            resposeErr[error[1]] = response[key];
          }
        }
      }
      if (resposeErr) {
        yield put(Actions.registrationFailure(resposeErr));
      } else {
        yield put(Actions.registrationSuccess({
          ...response,
          email: action.payload.email,
          password: action.payload.password}));
      }
    } catch (error) {
      yield put(Actions.registrationFailure(error.response));
    }
  }

  function* watchRegister(): Saga<void> {
    yield takeLatest(REGISTRATION, register);
  }

  return {
    watchLogin,
    watchRegister,
  };
};
