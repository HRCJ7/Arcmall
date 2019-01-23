import {createReducer} from 'reduxsauce';
import { SET_LANGUAGE, SET_LANGUAGE_SUCCESS, SET_LANGUAGE_FAILURE } from '../actions/Types';

const INITIAL_STATE = {
  userDataLoading: false,
  userData: {},
  error: null,

  languageLoading: false,
  languageData: {},
  lanuageError: null,
};

export const setLanguage = (state = INITIAL_STATE, {payload} : any) => ({
  ...state,
  languageLoading: true,
});

export const setLanguageSuccess = (state = INITIAL_STATE, {payload} : any) => ({
  ...state,
  languageData: payload.data,
  languageLoading: false,
});

export const setLanguageFailure = (state, {payload} : any) => ({
  ...state,
  lanuageError: payload.error,
  languageLoading: false,
});

const ACTION_HANDLERS = {
  [SET_LANGUAGE]: setLanguage,
  [SET_LANGUAGE_SUCCESS]: setLanguageSuccess,
  [SET_LANGUAGE_FAILURE]: setLanguageFailure,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
