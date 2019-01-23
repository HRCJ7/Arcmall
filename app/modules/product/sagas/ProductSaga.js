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
  GET_REVIEWS,
} from '../actions/Types';
import ProductService from '../services/ProductService';
import ProductActions from '../actions/ProductActions';

export default () => {
  function* getProductById({payload}) {
    try {
      const response = yield call(ProductService.getProductById, payload.product_id);
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

  function* getCategoryList({payload}) {
    try {
      const response = yield call(ProductService.getCatrgoryList, payload);
      console.log(response)
      yield put(ProductActions.getCategoryListSuccess(response));
    } catch (error) {
      console.log(error)
      yield put(ProductActions.getCategoryListFailure(error.response));
    }
  }

  function* watchGetCategoryList(): Saga<void> {
    yield takeLatest(GET_CATEGORY_LIST, getCategoryList);
  }

  function* getReviews({payload}) {
    try {
      const response = yield call(ProductService.getReviews, payload);
      console.log(response)
      yield put(ProductActions.getReviewsSuccess(response));
    } catch (error) {
      console.log(error)
      yield put(ProductActions.getReviewsFailure(error.response));
    }
  }

  function* watchGetReviews(): Saga<void> {
    yield takeLatest(GET_REVIEWS, getReviews);
  }

  return {
    watchGetProductById,
    watchGetProductList,
    watchGetCategoryList,
    watchGetReviews,
  };
};
