// @flow
import {combineReducers} from 'redux';
import LoginReducer from '../modules/login/reducers/LoginReducer';
import ProductReducer from '../modules/product/reducers/ProductReducer';
import UserReducer from '../modules/user/reducers/UserReducer';

export default combineReducers({
  login: LoginReducer,
  product: ProductReducer,
  user: UserReducer,
});
