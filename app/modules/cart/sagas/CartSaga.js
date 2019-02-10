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
  ADD_TO_CART,
  REMOVE_CART,
  EDIT_CART,
  GET_CART,
  GET_WISH_LIST,
  ADD_TO_WISH_LIST,
  REMOVE_FROM_WISH_LIST,
} from '../actions/Types';
import CartService from '../services/CartService';
import CartActions from '../actions/CartActions';

export default () => {
  function* addToCart({payload}) {
    try {
      const response = yield call(CartService.addToCart, payload);
      if (response.error) {
        yield put(CartActions.addToCartFailure(response.error));
      } else {
        yield put(CartActions.addToCartSuccess(response));
      }
    } catch (error) {
      yield put(CartActions.addToCartFailure(error.response));
    }
  }

  function* watchaddToCart(): Saga<void> {
    yield takeLatest(ADD_TO_CART, addToCart);
  }

  function* removeFromCart({payload}) {
    try {
      const response = yield call(CartService.removeFromCart, payload);
      yield put(CartActions.removeFromCartSuccess(response));
      yield put(CartActions.getCart());
    } catch (error) {
      yield put(CartActions.removeFromCartSuccess(error.response));
    }
  }

  function* watchRemoveFromCart(): Saga<void> {
    yield takeLatest(REMOVE_CART, removeFromCart);
  }

  function* editCart({payload}) {
    try {
      const response = yield call(CartService.editCart, payload);
      yield put(CartActions.editCartSuccess(response));
      yield put(CartActions.getCart());
    } catch (error) {
      yield put(CartActions.editCartFailure(error.response));
    }
  }

  function* watchEditCart(): Saga<void> {
    yield takeLatest(EDIT_CART, editCart);
  }

  function* getCart({payload}) {
    try {
      const response = yield call(CartService.getCart, payload);
      yield put(CartActions.getCartSuccess(response));
    } catch (error) {
      yield put(CartActions.getCartFailure(error.response));
    }
  }

  function* watchGetCart(): Saga<void> {
    yield takeLatest(GET_CART, getCart);
  }

  function* getWishList({payload}) {
    try {
      const response = yield call(CartService.getWishList, payload);
      yield put(CartActions.getWishListSuccess(response));
    } catch (error) {
      yield put(CartActions.getWishListFailure(error.response));
    }
  }

  function* watchGetWishList(): Saga<void> {
    yield takeLatest(GET_WISH_LIST, getWishList);
  }

  function* addtoWishList({payload}) {
    try {
      const response = yield call(CartService.addToWishList, payload);
      yield put(CartActions.addToWishListSuccess(response));
      yield put(CartActions.getWishList())
    } catch (error) {
      yield put(CartActions.addToWishListFailure(error.response));
    }
  }

  function* watchAddtoWishList(): Saga<void> {
    yield takeLatest(ADD_TO_WISH_LIST, addtoWishList);
  }

  function* removeFromWishList({payload}) {
    try {
      const response = yield call(CartService.removeFromWishList, payload);
      yield put(CartActions.removeFromWishListSuccess(response));
      yield put(CartActions.getWishList())
    } catch (error) {
      yield put(CartActions.removeFromWishListFailure(error.response));
    }
  }

  function* watchRemoveFromWishList(): Saga<void> {
    yield takeLatest(REMOVE_FROM_WISH_LIST, removeFromWishList);
  }

  return {
    watchaddToCart,
    watchRemoveFromCart,
    watchEditCart,
    watchGetCart,

    watchGetWishList,
    watchAddtoWishList,
    watchRemoveFromWishList,
  };
};
