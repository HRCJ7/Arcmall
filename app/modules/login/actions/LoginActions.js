//@flow
import {LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE} from "./Types";

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

export default {
  login,
  loginSuccess,
  loginFailure,
}