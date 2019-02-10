import Config from 'react-native-config';
import { defaultRequestHeaders, getForm } from '../../../../services/RestService';



const BASE_URL: string = `${Config.API_URL}`;

export const getOrdersByStatus = async (order_status) => {
  let response = await fetch(`${BASE_URL}/order_history/getcustomerordersbystatus`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      ...defaultRequestHeaders,
    },
    body: getForm({order_status})
  });
  return response.json();
}