import {AsyncStorage} from 'react-native';
import {createReducer} from 'reduxsauce';
import {
  GET_PRODUCT_BY_ID,
  GET_PRODUCT_BY_ID_SUCCESS,
  GET_PRODUCT_BY_ID_FAILURE,
  GET_PRODUCT_LIST,
  GET_PRODUCT_LIST_SUCCESS,
  GET_PRODUCT_LIST_FAILURE,
  GET_CATEGORY_LIST,
  GET_CATEGORY_LIST_SUCCESS,
  GET_CATEGORY_LIST_FAILURE,
} from '../actions/Types';
import {POST_LOGIN} from '../../login/actions/Types';

const INITIAL_STATE = {
  productData: {},
  productLoading: true,
  productError: null,

  productList: {},
  productListLoading: true,
  productListError: null,

  categoryList: {},
  categoryListLoading: {},
  categoryListError: null,
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

const getProductListSuccess = (state = INITIAL_STATE, {payload} : any) => {
  let productList = {...state.productList};
  let categoryId = payload.data.category_id;
  if (categoryId) {
    productList[payload.data.category_id] = payload.data;
  }
  
  return {
    ...state,
    productListLoading: false,
    productList: productList,
  }
}

const getProductListFailure = (state, {payload} : any) => ({
  ...state,
  productListLoading: false,
  productListError: payload.error,
});

const getCategoryList = (state = INITIAL_STATE, {payload} : any) => ({
  ...state,
  categoryListLoading: true,
});

const getCategoryListSuccess = async (state = INITIAL_STATE, {payload} : any) => {
  console.log(JSON.stringify(payload.data.categories[0].categories))

  try {
    await AsyncStorage.setItem('categories', JSON.stringify(payload.data.categories[0].categories));
  } catch(err) {
    console.log(err)
  }
  
  return {
    ...state,
    categoryListLoading: false,
    categoryList: payload.data.categories[0].categories,
  }
};

const getCategoryListFailure = (state, {payload} : any) => ({
  ...state,
  categoryListLoading: false,
  categoryListError: payload.error,
});

export const postLogin = (state = INITIAL_STATE, {payload} : any) => {
  categories = JSON.parse(payload.categories);
  return {
    ...state,
    categoryList: categories,
    categoryListLoading: false,
  }
};

const ACTION_HANDLERS = {
  [GET_PRODUCT_BY_ID]: getProductById,
  [GET_PRODUCT_BY_ID_SUCCESS]: getProductByIdSuccess,
  [GET_PRODUCT_BY_ID_FAILURE]: getProductByIdFailure,

  [GET_PRODUCT_LIST]: getProductList,
  [GET_PRODUCT_LIST_SUCCESS]: getProductListSuccess,
  [GET_PRODUCT_LIST_FAILURE]: getProductListFailure,

  [GET_CATEGORY_LIST]: getCategoryList,
  [GET_CATEGORY_LIST_SUCCESS]: getCategoryListSuccess,
  [GET_CATEGORY_LIST_FAILURE]: getCategoryListFailure,

  [POST_LOGIN]: postLogin,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
