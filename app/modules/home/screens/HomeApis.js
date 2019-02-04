import Config from 'react-native-config';
import { defaultRequestHeaders, getForm } from '../../../services/RestService';


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

export const getLatestItems = async (start, limit) => {
  let response = await fetch(`${BASE_URL}/latest`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      ...defaultRequestHeaders,
    },
    body: getForm({start, limit})
  });
  return response.json();
}

export const getLoginStatus = async () => {
  let response = await fetch(`${BASE_URL}/user_login/isloggedin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      ...defaultRequestHeaders,
      body: getForm({data: {}})
    },
    // body: getForm({country_id: value.country_id})
  });
  return response.json();
}