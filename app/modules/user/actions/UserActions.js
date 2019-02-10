import { SET_PASSWORD,SET_PASSWORD_SUCCESS,SET_LANGUAGE,SET_PASSWORD_FAILURE, SET_LANGUAGE_SUCCESS, SET_LANGUAGE_FAILURE, GET_ADDRESSES, GET_ADDRESSES_SUCCESS, GET_ADDRESSES_FAILURE } from "./Types";

//@flow


const setPassword = (password: string) => ({
  type: SET_PASSWORD,
  payload: {
    password,
  },
});

const setPasswordSuccess = (data: any) => ({
  type: SET_PASSWORD_SUCCESS,
  payload: {
    data,
  },
});

const setPasswordFailure = (error: any) => ({
  type: SET_PASSWORD_FAILURE,
  payload: {
    error,
  },
});

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

const getAddresses = (language: string) => ({
  type: GET_ADDRESSES,
  payload: {
    code: language,
  },
});

const getAddressesSuccess = (data: any) => ({
  type: GET_ADDRESSES_SUCCESS,
  payload: {
    data,
  },
});

const getAddressesFailure = (error: any) => ({
  type: GET_ADDRESSES_FAILURE,
  payload: {
    error,
  },
});



export default {
  
 

  setPassword,
  setPasswordSuccess,
  setPasswordFailure,

  setLanguage,
  setLanguageSuccess,
  setLanguageFailure,

  getAddresses,
  getAddressesSuccess,
  getAddressesFailure,
}