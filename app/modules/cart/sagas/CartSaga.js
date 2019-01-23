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
  GET_CATEGORY_LIST,
} from '../actions/Types';
import CartService from '../services/CartService';
import CartActions from '../actions/CartActions';

export default () => {
  function* getProductById({payload}) {
    try {
      const response = yield call(CartService.getProductById, payload.product_id);
      console.log(response)
      yield put(CartActions.getProductByIdSuccess(response));
    } catch (error) {
      console.log(error)
      yield put(CartActions.getProductByIdFailure(error.response));
    }
  }

  function* watchGetProductById(): Saga<void> {
    yield takeLatest(GET_PRODUCT_BY_ID, getProductById);
  }

  function* getProductList({payload}) {
    try {
      const response = yield call(CartService.getProductList, payload);
      console.log(response)
      yield put(CartActions.getProductListSuccess(response));
    } catch (error) {
      console.log(error)
      yield put(CartActions.getProductListFailure(error.response));
    }
  }

  function* watchGetProductList(): Saga<void> {
    yield takeLatest(GET_PRODUCT_LIST, getProductList);
  }

  function* getCategoryList({payload}) {
    try {
      const response = yield call(CartService.getCatrgoryList, payload);
      console.log(response)
      yield put(CartActions.getCategoryListSuccess(response));
    } catch (error) {
      console.log(error)
      yield put(CartActions.getCategoryListFailure(error.response));
    }
  }

  function* watchGetCategoryList(): Saga<void> {
    yield takeLatest(GET_CATEGORY_LIST, getCategoryList);
  }

  return {
    watchGetProductById,
    watchGetProductList,
    watchGetCategoryList,
  };
};
