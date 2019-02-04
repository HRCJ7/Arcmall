import Config from 'react-native-config';
import { defaultRequestHeaders } from '../../../services/RestService';


const BASE_URL: string = `${Config.API_URL}`;

export const getFeaturedItems = async () => {
  let response = await fetch(`${BASE_URL}/featured`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      ...defaultRequestHeaders,
    },
    // body: getForm({country_id: value.country_id})
  });
  return response.json();
}