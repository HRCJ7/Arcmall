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
  GET_WISH_LIST,
  GET_WISH_LIST_SUCCESS,
  GET_WISH_LIST_FAILURE,
  ADD_TO_WISH_LIST,
  REMOVE_FROM_WISH_LIST,
  REMOVE_FROM_WISH_LIST_SUCCESS,
  REMOVE_FROM_WISH_LIST_FAILURE,
  ADD_TO_WISH_LIST_SUCCESS,
  ADD_TO_WISH_LIST_FAILURE,
} from '../actions/Types';
import {POST_LOGIN, SIGN_OUT} from '../../login/actions/Types';

const INITIAL_STATE = {
  cartData: null,
  removeCartData: {},
  editCartData: {},
  addCartData: {},

  cartLoading: false,
  cartError: null,

  wishlistData: null,
  addWishlistData: null,
  removeWishListData: null,
  wishListIds: {},

  wishlistLoading: false,
  wishlistError: null,
};

const addToCart = (state = INITIAL_STATE, {payload} : any) => ({
  ...state,
  cartLoading: true,
  cartData: null,
  cartError: null,
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

export const signOut = (state = INITIAL_STATE, payload: any) => {
  return {
    ...INITIAL_STATE,
  };
};

const getWishList = (state = INITIAL_STATE, {payload} : any) => ({
  ...state,
  wishlistLoading: true,
  wishlistError: null,
});

const getWishListSuccess = (state = INITIAL_STATE, {payload} : any) => {
  let wishListIds = {};
  let wishlist = payload.data.products;

  for (const wish of wishlist) {
    wishListIds[wish.product_id] = true;
  }
  return {
    ...state,
    wishlistLoading: false,
    wishlistData: payload.data.products,
    wishListIds: wishListIds,
  }
};

const getWishListFailure = (state, {payload} : any) => ({
  ...state,
  wishlistLoading: false,
  wishlistError: payload.error,
});

const addToWishList = (state = INITIAL_STATE, {payload} : any) => ({
  ...state,
  wishlistLoading: true,
  wishlistError: null,
});

const addToWishListSuccess = (state = INITIAL_STATE, {payload} : any) => {  
  return {
    ...state,
    wishlistLoading: false,
    addWishlistData: payload.data,
  }
};

const addToWishListFailure = (state, {payload} : any) => ({
  ...state,
  wishlistLoading: false,
  wishlistError: payload.error,
});

const removeFromWishList = (state = INITIAL_STATE, {payload} : any) => ({
  ...state,
  wishlistLoading: true,
  wishlistError: null,
});

const removeFromWishListSuccess = (state = INITIAL_STATE, {payload} : any) => {  
  return {
    ...state,
    wishlistLoading: false,
    removeWishListData: payload.data,
  }
};

const removeFromWishListFailure = (state, {payload} : any) => ({
  ...state,
  wishlistLoading: false,
  wishlistError: payload.error,
});

const ACTION_HANDLERS = {
  [ADD_TO_CART]: addToCart,
  [ADD_TO_CART_SUCCESS]: addToCartSuccess,
  [ADD_TO_CART_FAILURE]: addToCartFailure,

  [SIGN_OUT]: signOut,

  [EDIT_CART]: editCart,
  [EDIT_CART_SUCCESS]: editCartSuccess,
  [EDIT_CART_FAILURE]: editCartFailure,

  [REMOVE_CART]: removeFromCart,
  [REMOVE_CART_SUCCESS]: removeFromCartSuccess,
  [REMOVE_CART_FAILURE]: removeFromCartFailure,

  [GET_CART]: getCart,
  [GET_CART_SUCCESS]: getCartSuccess,
  [GET_CART_FAILURE]: getCartFailure,

  [GET_WISH_LIST]: getWishList,
  [GET_WISH_LIST_SUCCESS]: getWishListSuccess,
  [GET_WISH_LIST_FAILURE]: getWishListFailure,

  [ADD_TO_WISH_LIST]: addToWishList,
  [ADD_TO_WISH_LIST_SUCCESS]: addToWishListSuccess,
  [ADD_TO_WISH_LIST_FAILURE]: addToWishListFailure,

  [REMOVE_FROM_WISH_LIST]: removeFromWishList,
  [REMOVE_FROM_WISH_LIST_SUCCESS]: removeFromWishListSuccess,
  [REMOVE_FROM_WISH_LIST_FAILURE]: removeFromWishListFailure,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
