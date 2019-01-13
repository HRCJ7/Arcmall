import {createReducer} from 'reduxsauce';
import {
  GET_PRODUCT_BY_ID,
  GET_PRODUCT_BY_ID_SUCCESS,
  GET_PRODUCT_BY_ID_FAILURE,
} from '../actions/Types';

const INITIAL_STATE = {
  productData: {},
  productLoading: false,
  productError: null,
};

export const getProductById = (state = INITIAL_STATE, {payload} : any) => ({
  ...state,
  productLoading: true,
});

export const getProductByIdSuccess = (state = INITIAL_STATE, {payload} : any) => ({
  ...state,
  productData: payload.data,
  productLoading: false,
});

export const getProductByIdFailure = (state, {payload} : any) => ({
  ...state,
  productError: payload.error,
  productLoading: false,
});

const ACTION_HANDLERS = {
  [GET_PRODUCT_BY_ID]: getProductById,
  [GET_PRODUCT_BY_ID_SUCCESS]: getProductByIdSuccess,
  [GET_PRODUCT_BY_ID_FAILURE]: getProductByIdFailure,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
