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
  LOGIN, REGISTRATION,FORGET_PASSWORD
} from '../actions/Types';
import { COOKIE_PHPSSID, COOKIE_LANGUAGE, COOKIE_CURENCY } from '../../../Constants';
import CartActions from '../../cart/actions/CartActions';

export default () => {

  function* forgetPassword(action) {
    try {
      const response = yield call(LoginService.forgetPassword, action.payload.email);
     
    } catch (error) {
      
    }
  }

  function* watchForgetPassword(): Saga<void> {
  function* forgetPassword(action) {
    yield takeLatest(FORGET_PASSWORD, login);
  }


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
      let resposeErr = '';
      for (let key of Object.keys(response)) {
        let error = key.split('_');
        if (error[0] === 'error') {
          // error[1] == 'warning'         
          const value = response[key];
          if(typeof value === 'string' && value !== '') {
            console.log(value)
            resposeErr = `${resposeErr} \n ${value}`;
            // resposeErr[error[1]] = value;
          }
        }
      }
      console.log(resposeErr)
      if (resposeErr) {
        yield put(Actions.registrationFailure(resposeErr));
      } else {
        yield put(Actions.registrationSuccess({
          ...response,
          email: action.payload.email,
          password: action.payload.password}));
      }
    } catch (error) {
      console.log(error)
      let resposeErr = null;
      // for (let key of error.response.json()) {
      //   let error = key.split('_');
      //   if (error[0] === 'error') {
      //     if(key instanceof String && key !== '') {
      //       resposeErr = resposeErr? resposeErr: {};
      //       resposeErr[error[1]] = key;
      //     }
      //   }
      // }
      // console.log(resposeErr)
      yield put(Actions.registrationFailure(resposeErr));
    }
  }

  function* watchRegister(): Saga<void> {
    yield takeLatest(REGISTRATION, register);
  }

  return {
    watchLogin,
    watchRegister,
    watchForgetPassword
  };
};
