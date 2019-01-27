import {AsyncStorage} from 'react-native';
import {createReducer} from 'reduxsauce';
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
} from '../actions/Types';
import {POST_LOGIN, SIGN_OUT} from '../../login/actions/Types';

const INITIAL_STATE = {
  cartData: null,
  removeCartData: {},
  editCartData: {},
  addCartData: {},
  cartLoading: false,
  cartError: null,
};

const addToCart = (state = INITIAL_STATE, {payload} : any) => ({
  ...state,
  cartLoading: true,
});

const addToCartSuccess = (state = INITIAL_STATE, {payload} : any) => {  
  return {
    ...state,
    cartLoading: false,
    addCartData: payload.data,
  }
};

const addToCartFailure = (state, {payload} : any) => ({
  ...state,
  cartLoading: false,
  cartError: payload.error,
});

const editCart = (state = INITIAL_STATE, {payload} : any) => ({
  ...state,
  cartLoading: true,
});

const editCartSuccess = (state = INITIAL_STATE, {payload} : any) => {  
  return {
    ...state,
    cartLoading: false,
    editCartData: payload.data,
  }
};

const editCartFailure = (state, {payload} : any) => ({
  ...state,
  cartLoading: false,
  cartError: payload.error,
});

const removeFromCart = (state = INITIAL_STATE, {payload} : any) => ({
  ...state,
  cartLoading: true,
});

const removeFromCartSuccess = (state = INITIAL_STATE, {payload} : any) => {  
  return {
    ...state,
    cartLoading: false,
    removeCartData: payload.data,
  }
};

const removeFromCartFailure = (state, {payload} : any) => ({
  ...state,
  cartLoading: false,
  cartError: payload.error,
});

const getCart = (state = INITIAL_STATE, {payload} : any) => ({
  ...state,
  cartLoading: true,
});

const getCartSuccess = (state = INITIAL_STATE, {payload} : any) => {  
  return {
    ...state,
    cartLoading: false,
    cartData: payload.data,
  }
};

const getCartFailure = (state, {payload} : any) => ({
  ...state,
  cartLoading: false,
  cartError: payload.error,
});

// export const signOut = (state = INITIAL_STATE, payload: any) => {
//   return {
//     ...INITIAL_STATE,
//   };
// };

const ACTION_HANDLERS = {
  [ADD_TO_CART]: addToCart,
  [ADD_TO_CART_SUCCESS]: addToCartSuccess,
  [ADD_TO_CART_FAILURE]: addToCartFailure,

  [EDIT_CART]: editCart,
  [EDIT_CART_SUCCESS]: editCartSuccess,
  [EDIT_CART_FAILURE]: editCartFailure,

  [REMOVE_CART]: removeFromCart,
  [REMOVE_CART_SUCCESS]: removeFromCartSuccess,
  [REMOVE_CART_FAILURE]: removeFromCartFailure,

  [GET_CART]: getCart,
  [GET_CART_SUCCESS]: getCartSuccess,
  [GET_CART_FAILURE]: getCartFailure,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
