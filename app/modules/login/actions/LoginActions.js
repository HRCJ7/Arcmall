//@flow
import {LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE, POST_LOGIN, REGISTRATION, REGISTRATION_SUCCESS, REGISTRATION_FAILURE, SIGN_OUT} from "./Types";

const login = (email: string, password: string) => ({
    type: LOGIN,
    payload: {
      email,
      password,
    },
});

const loginSuccess = (data: any) => ({
  type: LOGIN_SUCCESS,
  payload: {
    data,
  },
});

const loginFailure = (error: any) => ({
  type: LOGIN_FAILURE,
  payload: {
    error,
  },
});

const postLogin = (data) => ({
  type: POST_LOGIN,
  payload: data,
});

const signOut = (data) => ({
  type: SIGN_OUT,
  payload: data,
});

const registration = (data) => ({
  type: REGISTRATION,
  payload: data,
});

const registrationSuccess = (data: any) => ({
  type: REGISTRATION_SUCCESS,
  payload: {
    data,
  },
});

const registrationFailure = (error: any) => ({
  type: REGISTRATION_FAILURE,
  payload: {
    error,
  },
});

export default {
  login,
  loginSuccess,
  loginFailure,
  postLogin,
  signOut,

  registration,
  registrationSuccess,
  registrationFailure,
}