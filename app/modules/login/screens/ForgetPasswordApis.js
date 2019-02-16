import Config from 'react-native-config';
let base64 = require('base-64');
import PayPal from 'react-native-paypal-wrapper';
import { defaultRequestHeaders, getForm } from '../../../services/RestService';

const BASE_URL: string = `${Config.API_URL}`;

export const forgetPassword = async (email) => {
  const options = {
    method: 'POST',
    headers: {
      ...defaultRequestHeaders
    },
    body: getForm({email})
  }

  let response = await fetch(`${BASE_URL}/password`, options);
  return await response.json();
};