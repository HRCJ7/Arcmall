import {AsyncStorage} from 'react-native';
import {createReducer} from 'reduxsauce';
import {
  GET_LOGIN_VERIFICATION,
  GET_LOGIN_VERIFICATION_SUCCESS,
  GET_LOGIN_VERIFICATION_FAILURE,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  POST_LOGIN,
  REGISTRATION,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILURE,
  SIGN_OUT
} from '../actions/Types';
import { NativeIconAPI } from 'react-native-vector-icons/dist/lib/create-icon-set';
import { STORAGE_USER, COOKIE_PHPSSID, COOKIE_CURENCY, COOKIE_LANGUAGE } from '../../../Constants';
import { clearCookies, clearCookiesAndUser, setUser } from '../../../store/AsyncStorageHelper';
import CookieManager from 'react-native-cookies';

const INITIAL_STATE = {
  user: null,
  error: null,
  isLoading: false,

  registrationData: null,
  registrationError: null,
  registrationLoading: true,
};

export const login = (state = INITIAL_STATE, {payload} : any) => ({
  ...state,
  isLoading: true,
  error: null,
});

export const loginSuccess = (state = INITIAL_STATE, {payload} : any) => {
  let data = {...payload.data}
  delete data['password']; 
  setUser(JSON.stringify(data));
  return {
    ...state,
    user: data,
    isLoading: false,
  }
};

export const loginFailure = (state, {payload} : any) => ({
  ...state,
  error: payload.error,
  isLoading: false,
});

export const registration = (state = INITIAL_STATE, {payload} : any) => ({
  ...state,
  registrationData: null,
  registrationLoading: true,
  registrationError: null,
});

export const registrationSuccess = (state = INITIAL_STATE, {payload} : any) => {
  return {
    ...state,
    registrationData: payload.data,
    registrationLoading: false,
  }
};

export const registrationFailure = (state, {payload} : any) => ({
  ...state,
  registrationError: payload.error,
  registrationLoading: false,
  registrationData: null,
});

export const postLogin = (state = INITIAL_STATE, {payload} : any) => {

  // setUser(payload.user);
  return {
    ...state,
    user: payload.user,
    language: payload.language,
    registrationData: null
  }
};

export const signOut = async (state = INITIAL_STATE, {payload} : any) => {
  await clearCookies();
  await clearCookiesAndUser();
  await CookieManager.clearAll();
  return {
    registrationData: null,
    user: null,
  };
};

const ACTION_HANDLERS = {
  [LOGIN]: login,
  [LOGIN_SUCCESS]: loginSuccess,
  [LOGIN_FAILURE]: loginFailure,
  [POST_LOGIN]: postLogin,
  [SIGN_OUT]: signOut,

  [REGISTRATION]: registration,
  [REGISTRATION_SUCCESS]: registrationSuccess,
  [REGISTRATION_FAILURE]: registrationFailure,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
