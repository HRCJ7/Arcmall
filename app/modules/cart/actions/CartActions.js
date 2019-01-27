//@flow
import {
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
  GET_CART_FAILURE,
} from "./Types";

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