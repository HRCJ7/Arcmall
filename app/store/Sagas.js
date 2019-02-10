// @flow
import {all, fork} from 'redux-saga/effects';
import type {Saga} from 'redux-saga';

import loginSaga from '../modules/login/sagas/LoginSaga';
import productSaga from '../modules/product/sagas/ProductSaga';
import userSaga from '../modules/user/sagas/UserSaga';
import cartSaga from '../modules/cart/sagas/CartSaga';

export default function* root(): Saga<void> {
  const createdloginSaga = loginSaga();
  const createdProductSaga = productSaga();
  const createdUserSaga = userSaga();
  const createdCartSaga = cartSaga();

  yield all([
    fork(createdloginSaga.watchLogin),
    fork(createdloginSaga.watchRegister),

    fork(createdProductSaga.watchGetProductById),
    fork(createdProductSaga.watchGetProductList),
    fork(createdProductSaga.watchGetCategoryList),
    fork(createdProductSaga.watchGetReviews),

    fork(createdCartSaga.watchaddToCart),
    fork(createdCartSaga.watchRemoveFromCart),
    fork(createdCartSaga.watchEditCart),
    fork(createdCartSaga.watchGetCart),

    fork(createdUserSaga.watchSetLanguage),
    fork(createdUserSaga.watchGetAddreses),

    fork(createdCartSaga.watchGetWishList),
    fork(createdCartSaga.watchAddtoWishList),
    fork(createdCartSaga.watchRemoveFromWishList),
  ]);
}
