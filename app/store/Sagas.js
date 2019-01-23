// @flow
import {all, fork} from 'redux-saga/effects';
import type {Saga} from 'redux-saga';

import loginSaga from '../modules/login/sagas/LoginSaga';
import productSaga from '../modules/product/sagas/ProductSaga';
import userSaga from '../modules/user/sagas/UserSaga';

export default function* root(): Saga<void> {
  const createdloginSaga = loginSaga();
  const createdProductSaga = productSaga();
  const createdUserSaga = userSaga();

  yield all([
    fork(createdloginSaga.watchLogin),
    fork(createdloginSaga.watchRegister),

    fork(createdProductSaga.watchGetProductById),
    fork(createdProductSaga.watchGetProductList),
    fork(createdProductSaga.watchGetCategoryList),
    fork(createdProductSaga.watchGetReviews),

    fork(createdUserSaga.watchSetLanguage),
  ]);
}
