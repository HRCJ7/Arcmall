import Config from 'react-native-config';
import { defaultRequestHeaders, getForm } from '../../../../services/RestService';
let base64 = require('base-64');
import PayPal from 'react-native-paypal-wrapper';

const BASE_URL: string = `${Config.API_URL}`;
const PAYPAL_URL: string = `${Config.PAYPAL_URL}`

export const configurePaypal = async (price, currency, description) => {
  PayPal.initialize(PayPal.NO_NETWORK, "AYuPRdf4_IxjDfCBzrmlzgqCukYstLaCF6JMjEH2F5HYKi6bsrB2tCIP8tmahX9s4aVQ25FqPJr4jbHn");
  return PayPal.pay({
    price: `${price}`,
    currency: currency,
    description: description,
  });
  // const username = 'AYuPRdf4_IxjDfCBzrmlzgqCukYstLaCF6JMjEH2F5HYKi6bsrB2tCIP8tmahX9s4aVQ25FqPJr4jbHn';
  // const password = 'ENBu3lMxIjMBNnW4ZMfLuu57pyEWNOudh_FS6FV5_LjlgdCmrQAzUwMgvmaIZPFsCqoqfAVDos-CqJFg';
  // const token = 'Basic ' + base64.encode(username + ':' + password) ;
  // paypal.configure({
  //   'mode': 'sandbox', //sandbox or live
  //   'client_id': username,
  //   'client_secret': password,
  // });
}

export const getShippingDetails = async (value) => {
  let response = await fetch(`${BASE_URL}/shipping/methods`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      ...defaultRequestHeaders,
    },
  });

  response = await response.json();
  
  const shipping_methods = response.shipping_methods;
  let shippingMethods = [];

  for (const shippingMethod of Object.keys(shipping_methods)) {
    let shipMethd = shipping_methods[shippingMethod];
    let title = shipMethd.title;
    let quote = shipMethd.quote[shippingMethod];
    let code = null;
    let cost = null;
    let price = null;
    if (quote) {
      code = shipMethd.quote[shippingMethod].code;
      cost = shipMethd.quote[shippingMethod].cost;
      price = shipMethd.quote[shippingMethod].text;
    }
    if(title && code && price) {
      shippingMethods.push({
        title,
        code,
        cost,
        price,
      });
    }
  }
  
  return shippingMethods;
}

export const setShippingDetails = async (shipping_method) => {
  const options = {
    method: 'POST',
    credentials: 'include',
    headers: {
      ...defaultRequestHeaders,
    },
    body: getForm({shipping_method})
  }

  let response = await fetch(`${BASE_URL}/shipping/method`, options);
  return await response.json();
}

export const getPaymentMethods = async (details) => {
  const options = {
    method: 'GET',
    credentials: 'include',
    headers: {
      ...defaultRequestHeaders,
    },
  }

  let methods = [];

  let response = await fetch(`${BASE_URL}/payment/methods`, options);
  response = await response.json();

  for(let key of Object.keys(response.payment_methods)) {
    let obj = response.payment_methods[key];
    methods.push({
      title: obj.title,
      code: obj.code,
      terms: obj.terms,
      sortOrder: obj.sort_order,
    })
  }

  return methods;
}

export const setPaymentMethod = async (payment_method) => {
  const options = {
    method: 'POST',
    credentials: 'include',
    headers: {
      ...defaultRequestHeaders,
    },
    body: getForm({payment_method})
  }
  let response = await fetch(`${BASE_URL}/payment/method`, options);
  return await response.json();
}

export const addOrder = async (details) => {
  const options = {
    method: 'POST',
    credentials: 'include',
    headers: {
      ...defaultRequestHeaders,
    },
    body: getForm(details)
  }

  let response = await fetch(`${BASE_URL}/order/add`, options);
  return await response.json();
}

export const getPaypalAccessToken = async (details) => {

  const username = 'AYuPRdf4_IxjDfCBzrmlzgqCukYstLaCF6JMjEH2F5HYKi6bsrB2tCIP8tmahX9s4aVQ25FqPJr4jbHn';
  const password = 'ENBu3lMxIjMBNnW4ZMfLuu57pyEWNOudh_FS6FV5_LjlgdCmrQAzUwMgvmaIZPFsCqoqfAVDos-CqJFg';
  const token = 'Basic ' + base64.encode(username + ':' + password) ;
  let formdata = new FormData();
  
  formdata.append('grant_type', 'client_credentials');

  const options = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Authorization': token,
      'Content-Type': 'x-www-form-urlencoded',
      'Accept': 'application/json',
    },
    body: JSON.stringify({grant_type:'client_credentials'}),
  }

  let response = await fetch(`${PAYPAL_URL}/oauth2/token`, options);
  return await response.json();
}

export const pay = async (bearerToken, paymentDetails) => {
  const options = {
    method: 'POST',
    Authorization: bearerToken,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(paymentDetails),
  }

  let response = await fetch(`${PAYPAL_URL}/payments/payment`, options);
  return await response.json();
};