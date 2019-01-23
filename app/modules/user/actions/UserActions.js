import { SET_LANGUAGE, SET_LANGUAGE_SUCCESS, SET_LANGUAGE_FAILURE } from "./Types";

//@flow


const setLanguage = (language: string) => ({
  type: SET_LANGUAGE,
  payload: {
    code: language,
  },
});

const setLanguageSuccess = (data: any) => ({
  type: SET_LANGUAGE_SUCCESS,
  payload: {
    data,
  },
});

const setLanguageFailure = (error: any) => ({
  type: SET_LANGUAGE_FAILURE,
  payload: {
    error,
  },
});

export default {
  setLanguage,
  setLanguageSuccess,
  setLanguageFailure,
}