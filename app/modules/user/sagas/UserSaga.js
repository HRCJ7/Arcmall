// @flow
import {
  takeLatest,
  call,
  put,
} from 'redux-saga/effects';
import type {
  Saga,
} from 'redux-saga';

import {
  GET_LOGIN_VERIFICATION,
  PLAYER_REGISTRATION,
  SET_LANGUAGE,
  GET_ADDRESSES,
} from '../actions/Types';
import UserService from '../services/UserService';
import UserActions from '../actions/UserActions';
import ProductActions from '../../product/actions/ProductActions';

export default () => {
  function* setLanguage(action) {
    try {
      const response = yield call(UserService.setLanguage, action.payload.code);
      yield put(UserActions.setLanguageSuccess(response));
      yield put(ProductActions.getCategoryList());
    } catch (error) {
      yield put(UserActions.setLanguageFailure(error.response));
      yield put(ProductActions.getCategoryList());
    }
  }

  function* watchSetLanguage(): Saga<void> {
    yield takeLatest(SET_LANGUAGE, setLanguage);
  }

  function* getAddreses(action) {
    try {
      const response = yield call(UserService.getAddresses);
      yield put(UserActions.getAddressesSuccess(response));
    } catch (error) {
      yield put(UserActions.getAddressesFailure(error.response));
    }
  }

  function* watchGetAddreses(): Saga<void> {
    yield takeLatest(GET_ADDRESSES, getAddreses);
  }

  return {
    watchSetLanguage,
    watchGetAddreses,
  };
};
