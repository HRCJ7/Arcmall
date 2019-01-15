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

  function* register(action) {
    try {
      const response = yield call(LoginService.register, action.payload);
      let resposeErr = null;
      console.log(response)
      for (let key in response) {
        let error = key.split('_');
        console.log(error)
        if (error[0] === 'error') {
          resposeErr = resposeErr? resposeErr: {};
          if(response[key].length>0) {
            resposeErr[error[1]] = response[key];
          }
        }
      }
      if (resposeErr) {
        yield put(Actions.registrationFailure(resposeErr));
      } else {
        yield put(Actions.registrationSuccess(response));
      }
    } catch (error) {
      yield put(Actions.registrationFailure(error.response));
      console.log(error)
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
