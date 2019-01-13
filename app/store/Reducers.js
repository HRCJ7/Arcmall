// @flow
import {combineReducers} from 'redux';
import LoginReducer from '../modules/login/reducers/LoginReducer';
import ProductReducer from '../modules/product/reducers/ProductReducer';

export default combineReducers({
  login: LoginReducer,
  product: ProductReducer,
});
