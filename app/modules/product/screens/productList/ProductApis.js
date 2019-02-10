import Config from 'react-native-config';
import { defaultRequestHeaders, getForm } from '../../../../services/RestService';


const BASE_URL: string = `${Config.API_URL}`;

export const getProductsByOrder = async (order_id) => {
  let response = await fetch(`${BASE_URL}/order_history/info&order_id=${order_id}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      ...defaultRequestHeaders,
    },
  });
  return response.json();
}

export const getSellerProducts = async (customer_id, start = 0, limit = 1000) => {
  console.log(start, limit)
  let response = await fetch(`${BASE_URL}/product/getsellerproducts`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      ...defaultRequestHeaders,
    },
    body: getForm({customer_id, start, limit})
  });
  return response.json();
}