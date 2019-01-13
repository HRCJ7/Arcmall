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
  GET_PRODUCT_BY_ID,
  GET_PRODUCT_LIST,
} from '../actions/Types';
import ProductService from '../services/ProductService';
import ProductActions from '../actions/ProductActions';

export default () => {
  function* getProductById({payload}) {
    try {
      const response = yield call(ProductService.getProductById, payload.product_id);
      console.log(response)
      yield put(ProductActions.getProductByIdSuccess(response));
    } catch (error) {
      console.log(error)
      yield put(ProductActions.getProductByIdFailure(error.response));
    }
  }

  function* watchGetProductById(): Saga<void> {
    yield takeLatest(GET_PRODUCT_BY_ID, getProductById);
  }

  function* getProductList({payload}) {
    try {
      const response = yield call(ProductService.getProductList, payload);
      console.log(response)
      yield put(ProductActions.getProductListSuccess(response));
    } catch (error) {
      console.log(error)
      yield put(ProductActions.getProductListFailure(error.response));
    }
  }

  function* watchGetProductList(): Saga<void> {
    yield takeLatest(GET_PRODUCT_LIST, getProductList);
  }

  return {
    watchGetProductById,
    watchGetProductList,
  };
};
