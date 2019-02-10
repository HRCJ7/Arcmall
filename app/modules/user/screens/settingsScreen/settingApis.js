import Config from 'react-native-config';
import {getForm, defaultRequestHeaders, getCookie} from '../../../../services/RestService';
import {getCategories} from '../../../../store/AsyncStorageHelper';
import { splitCategoryName } from '../../../../services/ExternalServices';


const BASE_URL: string = `${Config.API_URL}`;

export const setLanguage = async (code) => {
  let response = await fetch(`${BASE_URL}/language/set`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      ...defaultRequestHeaders,
    },
    body: getForm({code})
  });
  return response.json();
}

export const setPaymentAddress = async (address) => {
  let response = await fetch(`${BASE_URL}/payment/address`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      ...defaultRequestHeaders,
    },
    body: getForm(address)
  });
  return response.json();
}

export const getZones = async (country_id) => {
  let response = await fetch(`${BASE_URL}/address/getZones`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      ...defaultRequestHeaders,
    },
    body: getForm({country_id: country_id})
  });
  return response.json();
}

export const logout = async (country_id) => {
  let response = await fetch(`${BASE_URL}/user_logout`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      ...defaultRequestHeaders,
    },
    body: getForm({data: {}})
  });
  return response.json();
}