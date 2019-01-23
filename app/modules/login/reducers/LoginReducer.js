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

export const loginSuccess = async (state = INITIAL_STATE, {payload} : any) => {
  let data = {...payload.data}
  console.log(data)
  delete data['password']; 
  await AsyncStorage.setItem('user', JSON.stringify(data));
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
  registrationLoading: true,
  registrationError: null,
});

export const registrationSuccess = (state = INITIAL_STATE, {payload} : any) => {
  console.log(payload)
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
});

export const postLogin = (state = INITIAL_STATE, {payload} : any) => {
  let user = {};
  if (payload.user) {
    user = JSON.parse(payload.user);
  }
  console.log(user)
  return {
    ...state,
    user: user,
    language: payload.language,
    registrationData: {}
  }
};

export const signOut = async (state = INITIAL_STATE, {payload} : any) => {
  await AsyncStorage.multiRemove(['user']);
  return {
    registrationData: {},
    user: {},
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
