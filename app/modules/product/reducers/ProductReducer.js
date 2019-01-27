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
  GET_CART_FAILURE,
} from '../actions/Types';
import {POST_LOGIN, SIGN_OUT} from '../../login/actions/Types';

const INITIAL_STATE = {
  productData: {},
  productLoading: true,
  productError: null,

  productList: {},
  productListLoading: true,
  productListError: null,

  categoryList: null,
  categoryListLoading: {},
  categoryListError: null,

  reviews: null,
  reviewsLoading: {},
  reviewsError: null,

  cartData: null,
  removeCartData: {},
  editCartData: {},
  addCartData: {},
  cartLoaing: {},
  cartError: null,
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
  categoryList: null,
  categoryListLoading: true,
});

const getCategoryListSuccess = (state = INITIAL_STATE, {payload} : any) => {
  let categories = payload.data.categories[0].categories;
  
  return {
    ...state,
    categoryListLoading: false,
    categoryList: categories,
  }
};

const getCategoryListFailure = (state, {payload} : any) => ({
  ...state,
  categoryListLoading: false,
  categoryListError: payload.error,
});

export const postLogin = (state = INITIAL_STATE, {payload} : any) => {
  let categories = JSON.parse(payload.categories);
  return {
    ...state,
    categoryList: categories? categories: state.categoryList,
    categoryListLoading: false,
  }
};

// export const signOut = (state = INITIAL_STATE, payload: any) => {
//   return {
//     ...INITIAL_STATE,
//   };
// };


const getReviews = (state = INITIAL_STATE, {payload} : any) => ({
  ...state,
  reviewsLoading: true,
});

const getReviewsSuccess = (state = INITIAL_STATE, {payload} : any) => {  
  return {
    ...state,
    reviewsLoading: false,
    reviews: payload.data.reviews,
  }
};

const getReviewsFailure = (state, {payload} : any) => ({
  ...state,
  reviewsLoading: false,
  reviewsError: payload.error,
});


const addToCart = (state = INITIAL_STATE, {payload} : any) => ({
  ...state,
  cartLoaing: true,
});

const addToCartSuccess = (state = INITIAL_STATE, {payload} : any) => {  
  return {
    ...state,
    cartLoaing: false,
    addCartData: payload.data,
  }
};

const addToCartFailure = (state, {payload} : any) => ({
  ...state,
  cartLoaing: false,
  cartError: payload.error,
});

const editCart = (state = INITIAL_STATE, {payload} : any) => ({
  ...state,
  cartLoaing: true,
});

const editCartSuccess = (state = INITIAL_STATE, {payload} : any) => {  
  return {
    ...state,
    cartLoaing: false,
    editCartData: payload.data,
  }
};

const editCartFailure = (state, {payload} : any) => ({
  ...state,
  cartLoaing: false,
  cartError: payload.error,
});

const removeFromCart = (state = INITIAL_STATE, {payload} : any) => ({
  ...state,
  cartLoaing: true,
});

const removeFromCartSuccess = (state = INITIAL_STATE, {payload} : any) => {  
  return {
    ...state,
    cartLoaing: false,
    removeCartData: payload.data,
  }
};

const removeFromCartFailure = (state, {payload} : any) => ({
  ...state,
  cartLoaing: false,
  cartError: payload.error,
});

const getCart = (state = INITIAL_STATE, {payload} : any) => ({
  ...state,
  cartLoaing: true,
});

const getCartSuccess = (state = INITIAL_STATE, {payload} : any) => {  
  return {
    ...state,
    cartLoaing: false,
    cartData: payload.data,
  }
};

const getCartFailure = (state, {payload} : any) => ({
  ...state,
  cartLoaing: false,
  cartError: payload.error,
});

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

  [GET_REVIEWS]: getReviews,
  [GET_REVIEWS_SUCCESS]: getReviewsSuccess,
  [GET_REVIEWS_FAILURE]: getReviewsFailure,

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
