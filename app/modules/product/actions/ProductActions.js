//@flow
import {GET_PRODUCT_BY_ID, GET_PRODUCT_BY_ID_SUCCESS, GET_PRODUCT_BY_ID_FAILURE} from "./Types";

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

export default {
  getProductById,
  getProductByIdSuccess,
  getProductByIdFailure,
}