import {createReducer} from 'reduxsauce';
import { SET_LANGUAGE, SET_LANGUAGE_SUCCESS, SET_LANGUAGE_FAILURE, GET_ADDRESSES, GET_ADDRESSES_SUCCESS, GET_ADDRESSES_FAILURE } from '../actions/Types';

const INITIAL_STATE = {
  userDataLoading: false,
  userData: {},
  error: null,

  languageLoading: false,
  languageData: {},
  lanuageError: null,

  addressesLoading: true,
  addressesData: null,
  countries: null,
  regions: null,
  addressesError: null,
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

export const getAddresses = (state = INITIAL_STATE, {payload} : any) => ({
  ...state,
  addressesLoading: true,
});

export const getAddressesSuccess = (state = INITIAL_STATE, {payload} : any) => {
  const {addresses, countries} = payload.data;
  console.log(addresses)
  const addressesObj = Object.keys(addresses).map(function(key) {
    return addresses[key];
  });

  return {
    ...state,
    addressesData: addressesObj,
    countries: countries,
    addressesLoading: false,
  }
};

export const getAddressesFailure = (state, {payload} : any) => ({
  ...state,
  addressesError: payload.error,
  addressesLoading: false,
});

const ACTION_HANDLERS = {
  [SET_LANGUAGE]: setLanguage,
  [SET_LANGUAGE_SUCCESS]: setLanguageSuccess,
  [SET_LANGUAGE_FAILURE]: setLanguageFailure,

  [GET_ADDRESSES]: getAddresses,
  [GET_ADDRESSES_SUCCESS]: getAddressesSuccess,
  [GET_ADDRESSES_FAILURE]: getAddressesFailure,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
