// @flow
import {NetInfo} from 'react-native';
import Config from 'react-native-config';

const isConnected = async () => {
  const connectionInfo = await NetInfo.getConnectionInfo();
  return connectionInfo.type != 'none';
}

const BASE_URL: string = `${Config.API_URL}`;

const defaultRequestHeaders: {[string]: string} = {
  'Accept': '*/*',
  'accept-encoding':'gzip, deflate',
  'Content-Type': 'multipart/form-data',
};

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
  endpoint: string, params: {[string]: any} | null, headers: {[string]: any} | null
): Promise<any> => {
  // Wait for connection
  await isConnected();

  // Create the request URL
  const url: string = `${BASE_URL}/${endpoint}${createURLParams(params)}`;
  const options: {[string]: any} = {
    headers: {
      method: 'GET',
      ...defaultRequestHeaders,
      ...headers,
      credentials: 'include',
    },
  };
  const response = await fetch(url, options);

  // Handle the response before returning
  return handleResponseStatus(response);
};

export const POST = async (
  endpoint: string, body: {[string]: any} | null, params: {[string]: any} | null, headers: {[string]: any} | null
): Promise<any> => {
  // Wait for connection
  await isConnected();

  // Create the request URL
  const url: string = `${BASE_URL}/${endpoint}${createURLParams(params)}`;
  const options: {[string]: any} = {
    method: 'POST',
    headers: {
      ...defaultRequestHeaders,
      ...headers,
    },
    body: getForm(body),
  };

  const response = await fetch(url, options);
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
