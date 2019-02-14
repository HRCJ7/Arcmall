import Config from 'react-native-config';
import { defaultRequestHeaders, getForm } from '../../../../services/RestService';



const BASE_URL: string = `${Config.API_URL}`;

export const getOrdersByStatus = async (order_status) => {
  let response = await fetch(`${BASE_URL}/order_history/getcustomerordersbystatus&order_status=${order_status}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      ...defaultRequestHeaders,
    },
  });
  return response.json();
}