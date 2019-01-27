//@flow
import {
  GET_PRODUCT_BY_ID,
  GET_PRODUCT_BY_ID_SUCCESS,
  GET_PRODUCT_BY_ID_FAILURE,
  GET_PRODUCT_LIST,
  GET_PRODUCT_LIST_FAILURE,
  GET_PRODUCT_LIST_SUCCESS,
  GET_CATEGORY_LIST,
  GET_CATEGORY_LIST_SUCCESS,
  GET_CATEGORY_LIST_FAILURE,
  GET_REVIEWS,
  GET_REVIEWS_SUCCESS,
  GET_REVIEWS_FAILURE,
  ADD_TO_CART,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAILURE,
  EDIT_CART,
  EDIT_CART_SUCCESS,
  EDIT_CART_FAILURE,
  REMOVE_CART,
  REMOVE_CART_SUCCESS,
  REMOVE_CART_FAILURE,
  GET_CART,
  GET_CART_SUCCESS,
  GET_CART_FAILURE
} from "./Types";

const getProductById = (product_id: number) => ({
    type: GET_PRODUCT_BY_ID,
    payload: {
      product_id
    },
});

const getProductByIdSuccess = (data: any) => ({
  type: GET_PRODUCT_BY_ID_SUCCESS,
  payload: {
    data,
  },
});

const getProductByIdFailure = (error: any) => ({
  type: GET_PRODUCT_BY_ID_FAILURE,
  payload: {
    error,
  },
});

const getProductList = (data) => ({
  type: GET_PRODUCT_LIST,
  payload: {
    ...data,
  },
});

const getProductListSuccess = (data: any) => ({
  type: GET_PRODUCT_LIST_SUCCESS,
  payload: {
    data,
  },
});

const getProductListFailure = (error: any) => ({
  type: GET_PRODUCT_LIST_FAILURE,
  payload: {
    error,
  },
});

const getCategoryList = (data) => ({
  type: GET_CATEGORY_LIST,
  payload: {
    ...data,
  },
});

const getCategoryListSuccess = (data: any) => ({
  type: GET_CATEGORY_LIST_SUCCESS,
  payload: {
    data,
  },
});

const getCategoryListFailure = (error: any) => ({
  type: GET_CATEGORY_LIST_FAILURE,
  payload: {
    error,
  },
});

const getReviews = (data) => ({
  type: GET_REVIEWS,
  payload: {
    ...data,
  },
});

const getReviewsSuccess = (data: any) => ({
  type: GET_REVIEWS_SUCCESS,
  payload: {
    data,
  },
});

const getReviewsFailure = (error: any) => ({
  type: GET_REVIEWS_FAILURE,
  payload: {
    error,
  },
});

const addToCart = (data) => ({
  type: ADD_TO_CART,
  payload: {
    ...data,
  },
});

const addToCartSuccess = (data: any) => ({
  type: ADD_TO_CART_SUCCESS,
  payload: {
    data,
  },
});

const addToCartFailure = (error: any) => ({
  type: ADD_TO_CART_FAILURE,
  payload: {
    error,
  },
});

const editCart = (data) => ({
  type: EDIT_CART,
  payload: {
    ...data,
  },
});

const editCartSuccess = (data: any) => ({
  type: EDIT_CART_SUCCESS,
  payload: {
    data,
  },
});

const editCartFailure = (error: any) => ({
  type: EDIT_CART_FAILURE,
  payload: {
    error,
  },
});

const removeFromCart = (data) => ({
  type: REMOVE_CART,
  payload: {
    ...data,
  },
});

const removeFromCartSuccess = (data: any) => ({
  type: REMOVE_CART_SUCCESS,
  payload: {
    data,
  },
});

const removeFromCartFailure = (error: any) => ({
  type: REMOVE_CART_FAILURE,
  payload: {
    error,
  },
});

const getCart = (data) => ({
  type: GET_CART,
  payload: {
    ...data,
  },
});

const getCartSuccess = (data: any) => ({
  type: GET_CART_SUCCESS,
  payload: {
    data,
  },
});

const getCartFailure = (error: any) => ({
  type: GET_CART_FAILURE,
  payload: {
    error,
  },
});


export default {
  getProductById,
  getProductByIdSuccess,
  getProductByIdFailure,

  getProductList,
  getProductListSuccess,
  getProductListFailure,
  
  getCategoryList,
  getCategoryListSuccess,
  getCategoryListFailure,

  getReviews,
  getReviewsSuccess,
  getReviewsFailure,

  addToCart,
  addToCartSuccess,
  addToCartFailure,

  editCart,
  editCartSuccess,
  editCartFailure,

  removeFromCart,
  removeFromCartSuccess,
  removeFromCartFailure,

  getCart,
  getCartSuccess,
  getCartFailure,
}