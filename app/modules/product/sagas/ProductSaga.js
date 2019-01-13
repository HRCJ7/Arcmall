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

  return {
    watchGetProductById,
  };
};
