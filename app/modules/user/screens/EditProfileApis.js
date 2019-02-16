import Config from 'react-native-config';
import { defaultRequestHeaders, getForm } from '../../../services/RestService';


const BASE_URL: string = `${Config.API_URL}`;


export const editProfile = async (user) => {
  let response = await fetch(`${BASE_URL}/useredit`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      ...defaultRequestHeaders,
    },
    body: getForm(user)
  });
  return response.json();
}

export const changePassword = async (password) => {
  let response = await fetch(`${BASE_URL}/password/changepassword`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      ...defaultRequestHeaders,
    },
    body: getForm(password)
  });
  return response.json();
}