// @flow
import {NetInfo, AsyncStorage} from 'react-native';
import Config from 'react-native-config';
import CookieManager from 'react-native-cookies';
import setCookie from 'set-cookie-parser'
import { COOKIE_PHPSSID, COOKIE_LANGUAGE, COOKIE_CURENCY } from '../Constants';

let cookieString = null;

const isConnected = async () => {
  const connectionInfo = await NetInfo.getConnectionInfo();
  return connectionInfo.type != 'none';
}

const BASE_URL: string = `${Config.API_URL}`;

const defaultRequestHeaders: {[string]: string} = {
  'Accept': '*/*',
  'accept-encoding':'gzip, deflate',
  'Content-Type': 'multipart/form-data',
  'credentials': 'same-origin',
};

const cookieToString = function(cookie, suffix) {
  return `${cookie.name}=${cookie.value}${suffix}`;
}  

const setCookies = async function(response, keys, newSession) {
  var combinedCookieHeader = response.headers.get('Set-Cookie');
  var splitCookieHeaders = setCookie.splitCookiesString(combinedCookieHeader)
  var cookies = setCookie.parse(splitCookieHeaders, {
    map: true 
  });
  console.log(cookies)
  const set = [];
  for (let key of keys) {
    set.push([key, cookieToString(cookies[key], '')])
    console.log(key)
  }
  await AsyncStorage.multiSet(set);
}

const getCookie = async function() {
  cookieString = '';
  await AsyncStorage.multiGet([COOKIE_PHPSSID, COOKIE_LANGUAGE, COOKIE_CURENCY], (err, stores) => {
    stores.map((result, i, store) => {
      let name = store[i][0];
      let value = store[i][1];
      cookieString = cookieString.concat(`${value}; `);
    });
  });
  cookieString = cookieString === ''? null: cookieString;
  return cookieString;
}

const getForm = function(data) {
  let bodyData = new FormData();
  for (let key in data) {
    bodyData.append(key, data[key]);
  }
  return bodyData;
}

const createURLParams = (params: {[string]: any} | null): string => {
  let convertedParams = '';

  // Add params to URL if there are any
  if (params) {
    Object
      .keys(params)
      .forEach((key, index) => {
        convertedParams += `${index === 0 ? '?' : '&'}${key}=${(params || {})[key]}`;
      });
  }

  return convertedParams;
};

const handleResponseStatus = async (response) => {
  if (response && response.status < 200 || response.status >= 300) {
    const error: any = new Error(response.statusText);
    error.response = await response.json();

    throw error;
  }

  return response.json();
};

export const buildAuthorizationHeader = (): {Authorization: string} => {
  const session = sessionActions.getSession();

  if (!session) {
    throw new Error('Session not available');
  }

  const {token} = session;
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const GET = async (
  endpoint: string, params: {[string]: any} | null, headers: {[string]: any} | null, updateCookieKeys: any = null
): Promise<any> => {
  // Wait for connection
  await isConnected();

  // Create the request URL
  const url: string = `${BASE_URL}/${endpoint}${createURLParams(params)}`;
  let cookie = await getCookie();
  const options: {[string]: any} = {
    headers: {
      method: 'GET',
      ...defaultRequestHeaders,
      ...headers,
      cookie: cookie,
    },
  };
  if (!cookie) {
    delete options.headers.Cookie;
  }
  
  const response = await fetch(url, options);
  console.log(response)

  if(!cookie) {
    await setCookies(response, [COOKIE_PHPSSID, COOKIE_LANGUAGE, COOKIE_CURENCY], true);
  } else if (updateCookieKeys) {
    await setCookies(response, updateCookieKeys, false);
  }
  // Handle the response before returning
  return handleResponseStatus(response);
};

export const POST = async (
  endpoint: string, body: {[string]: any} | null, params: {[string]: any} | null, headers: {[string]: any} | null, updateCookieKeys: any = null
): Promise<any> => {
  // Wait for connection
  await isConnected();

  // Create the request URL
  const url: string = `${BASE_URL}/${endpoint}${createURLParams(params)}`;
  let cookie = await getCookie();
  const options: {[string]: any} = {
    method: 'POST',
    headers: {
      ...defaultRequestHeaders,
      ...headers,
      cookie: cookie,
    },
    body: getForm(body),
  };

  if (!cookie) {
    delete options.headers.Cookie;
  }

  const response = await fetch(url, options);
  console.log(response)

  if(!cookie) {
    await setCookies(response, [COOKIE_PHPSSID, COOKIE_LANGUAGE, COOKIE_CURENCY], true);
  } else if (updateCookieKeys) {
    await setCookies(response, updateCookieKeys, false);
  }
  // Handle the response before returning
  return handleResponseStatus(response);
};

export const PUT = async (
  endpoint: string, body: {[string]: any} | null, params: {[string]: any} | null, headers: {[string]: any} | null
): Promise<any> => {
  // Wait for connection
  await isConnected();
  // Create the request URL
  const url: string = `${BASE_URL}/${endpoint}${createURLParams(params)}`;
  const options: {[string]: any} = {
    // Request type
    method: 'PUT',

    // Add headers
    headers: {
      // Spread the default request headers
      ...defaultRequestHeaders,

      // Spread the given additional headers
      ...headers,
    },

    // Append the requestbody
    body: JSON.stringify(body || {}),
  };
  const response = await fetch(url, options);

  // Handle the response before returning
  return handleResponseStatus(response);
};

export const PATCH = async (
  endpoint: string, body: {[string]: any} | null, params: {[string]: any} | null, headers: {[string]: any} | null
): Promise<any> => {
  // Wait for connection
  await isConnected();

  // Create the request URL
  const url: string = `${BASE_URL}/${endpoint}${createURLParams(params)}`;
  const options: {[string]: any} = {
    // Request type
    method: 'PATCH',

    // Add headers
    headers: {
      // Spread the default request headers
      ...defaultRequestHeaders,

      // Spread the given additional headers
      ...headers,
    },

    // Append the requestbody
    body: JSON.stringify(body || {}),
  };
  const response = await fetch(url, options);

  // Handle the response before returning
  return handleResponseStatus(response);
};

export const DELETE = async (
  endpoint: string, body: {[string]: any} | null, params: {[string]: any} | null, headers: {[string]: any} | null
): Promise<any> => {
  // Wait for connection
  await isConnected();

  // Create the request URL
  const url: string = `${BASE_URL}/${endpoint}${createURLParams(params)}`;
  const options: {[string]: any} = {
    // Request type
    method: 'DELETE',

    // Add headers
    headers: {
      // Spread the default request headers
      ...defaultRequestHeaders,

      // Spread the given additional headers
      ...headers,
    },

    // Append the requestbody
    body: JSON.stringify(body || {}),
  };
  const response = await fetch(url, options);

  // Handle the response before returning
  return handleResponseStatus(response);
};
