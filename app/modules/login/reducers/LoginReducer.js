import {createReducer} from 'reduxsauce';
import {
  GET_LOGIN_VERIFICATION,
  GET_LOGIN_VERIFICATION_SUCCESS,
  GET_LOGIN_VERIFICATION_FAILURE,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from '../actions/Types';

const INITIAL_STATE = {
  data: {},
  error: null,
  isLoading: false,
};

export const login = (state = INITIAL_STATE, {payload} : any) => ({
  ...state,
  isLoading: true,
});

export const loginSuccess = (state = INITIAL_STATE, {payload} : any) => ({
  ...state,
  data: payload.data,
  isLoading: false,
});

export const loginFailure = (state, {payload} : any) => ({
  ...state,
  error: payload.error,
  isLoading: false,
});

const ACTION_HANDLERS = {
  [LOGIN]: login,
  [LOGIN_SUCCESS]: loginSuccess,
  [LOGIN_FAILURE]: loginFailure,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
