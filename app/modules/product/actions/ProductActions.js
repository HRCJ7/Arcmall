//@flow
import {
  GET_PRODUCT_BY_ID,
  GET_PRODUCT_BY_ID_SUCCESS,
  GET_PRODUCT_BY_ID_FAILURE,
  GET_PRODUCT_LIST,
  GET_PRODUCT_LIST_FAILURE,
  GET_PRODUCT_LIST_SUCCESS
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

export default {
  getProductById,
  getProductByIdSuccess,
  getProductByIdFailure,

  getProductList,
  getProductListSuccess,
  getProductListFailure,
}