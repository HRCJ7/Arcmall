import {createReducer} from 'reduxsauce';
import {
  GET_PRODUCT_BY_ID,
  GET_PRODUCT_BY_ID_SUCCESS,
  GET_PRODUCT_BY_ID_FAILURE,
  GET_PRODUCT_LIST,
  GET_PRODUCT_LIST_SUCCESS,
  GET_PRODUCT_LIST_FAILURE,
} from '../actions/Types';

const INITIAL_STATE = {
  productData: {},
  productLoading: true,
  productError: null,

  productList: {},
  productListLoading: true,
  productListError: null,
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

const getProductList = (state = INITIAL_STATE, {payload} : any) => ({
  ...state,
  productListLoading: true,
});

const getProductListSuccess = (state = INITIAL_STATE, {payload} : any) => ({
  ...state,
  productListLoading: false,
  productList: payload.data,
});

const getProductListFailure = (state, {payload} : any) => ({
  ...state,
  productListLoading: false,
  productListError: payload.error,
});


const ACTION_HANDLERS = {
  [GET_PRODUCT_BY_ID]: getProductById,
  [GET_PRODUCT_BY_ID_SUCCESS]: getProductByIdSuccess,
  [GET_PRODUCT_BY_ID_FAILURE]: getProductByIdFailure,

  [GET_PRODUCT_LIST]: getProductList,
  [GET_PRODUCT_LIST_SUCCESS]: getProductListSuccess,
  [GET_PRODUCT_LIST_FAILURE]: getProductListFailure,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
