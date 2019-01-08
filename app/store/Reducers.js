// @flow
import {combineReducers} from 'redux';
import LoginReducer from '../modules/login/reducers/LoginReducer';

export default combineReducers({
  login: LoginReducer,
});
