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
  ADD_TO_CART,
  REMOVE_CART,
  EDIT_CART,
  GET_CART,
} from '../actions/Types';
import ProductService from '../services/ProductService';
import ProductActions from '../actions/ProductActions';

export default () => {
  function* getProductById({payload}) {
    try {
      const response = yield call(ProductService.getProductById, payload.product_id);
      yield put(ProductActions.getProductByIdSuccess(response));
    } catch (error) {
      yield put(ProductActions.getProductByIdFailure(error.response));
    }
  }

  function* watchGetProductById(): Saga<void> {
    yield takeLatest(GET_PRODUCT_BY_ID, getProductById);
  }

  function* getProductList({payload}) {
    try {
      const response = yield call(ProductService.getProductList, payload);
      yield put(ProductActions.getProductListSuccess(response));
    } catch (error) {
      yield put(ProductActions.getProductListFailure(error.response));
    }
  }

  function* watchGetProductList(): Saga<void> {
    yield takeLatest(GET_PRODUCT_LIST, getProductList);
  }

  function* getCategoryList({payload}) {
    try {
      const response = yield call(ProductService.getCatrgoryList, payload);
      yield put(ProductActions.getCategoryListSuccess(response));
    } catch (error) {
      yield put(ProductActions.getCategoryListFailure(error.response));
    }
  }

  function* watchGetCategoryList(): Saga<void> {
    yield takeLatest(GET_CATEGORY_LIST, getCategoryList);
  }

  function* getReviews({payload}) {
    try {
      const response = yield call(ProductService.getReviews, payload);
      yield put(ProductActions.getReviewsSuccess(response));
    } catch (error) {
      yield put(ProductActions.getReviewsFailure(error.response));
    }
  }

  function* watchGetReviews(): Saga<void> {
    yield takeLatest(GET_REVIEWS, getReviews);
  }

  function* addToCart({payload}) {
    try {
      const response = yield call(ProductService.addToCart, payload);
      yield put(ProductActions.addToCartSuccess(response));
    } catch (error) {
      yield put(ProductActions.addToCartFailure(error.response));
    }
  }

  function* watchaddToCart(): Saga<void> {
    yield takeLatest(ADD_TO_CART, addToCart);
  }

  function* removeFromCart({payload}) {
    try {
      const response = yield call(ProductService.removeFromCart, payload);
      yield put(ProductActions.removeFromCartSuccess(response));
      yield put(ProductActions.getCart());
    } catch (error) {
      yield put(ProductActions.removeFromCartSuccess(error.response));
    }
  }

  function* watchRemoveFromCart(): Saga<void> {
    yield takeLatest(REMOVE_CART, removeFromCart);
  }

  function* editCart({payload}) {
    try {
      const response = yield call(ProductService.editCart, payload);
      yield put(ProductActions.editCartSuccess(response));
      yield put(ProductActions.getCart());
    } catch (error) {
      yield put(ProductActions.editCartFailure(error.response));
    }
  }

  function* watchEditCart(): Saga<void> {
    yield takeLatest(EDIT_CART, editCart);
  }

  function* getCart({payload}) {
    try {
      const response = yield call(ProductService.getCart, payload);
      yield put(ProductActions.getCartSuccess(response));
    } catch (error) {
      yield put(ProductActions.getCartFailure(error.response));
    }
  }

  function* watchGetCart(): Saga<void> {
    yield takeLatest(GET_CART, getCart);
  }

  return {
    watchGetProductById,
    watchGetProductList,

    watchGetCategoryList,

    watchGetReviews,

    watchaddToCart,
    watchRemoveFromCart,
    watchEditCart,
    watchGetCart,
  };
};
