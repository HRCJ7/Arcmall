import {AsyncStorage} from 'react-native';
import { STORAGE_USER, COOKIE_PHPSSID, COOKIE_CURENCY, COOKIE_LANGUAGE, STORAGE_CATEGORIES } from '../Constants';

const clearCookies = async () => {
  await AsyncStorage.multiRemove([COOKIE_PHPSSID, COOKIE_CURENCY, COOKIE_LANGUAGE]);
}

const clearCookiesAndUser = async () => {
  await AsyncStorage.multiRemove([COOKIE_PHPSSID, COOKIE_CURENCY, COOKIE_LANGUAGE, STORAGE_USER]);
}

const getCookies = async (callback) => {
  await AsyncStorage.multiGet([COOKIE_PHPSSID, COOKIE_LANGUAGE, COOKIE_CURENCY], callback);
}

const getUser = async (callback) => {
  let user = await AsyncStorage.getItem(STORAGE_USER);
  if (user) {
    user = JSON.parse(user);
    user = user.customer_info;
  }
  return user;
}

const addToCart = async (cartData) => {
  let cart = await AsyncStorage.getItem(STORAGE_CART_LIST);
  if (cart) {
    cart = JSON.parse(cart);
  } else {
    cart = [];
  }
  cart.push(cartData);
  await AsyncStorage.setItem(STORAGE_CART_LIST, cart);
  return cart;
}

const getCart = async (cartData) => {
  let cart = await AsyncStorage.getItem(STORAGE_CART_LIST);
  return cart;
}

const getCategories = async () => {
  let categories = await AsyncStorage.getItem(STORAGE_CATEGORIES);
  return JSON.parse(categories);
}

export {
  clearCookies,
  getCookies,
  getUser,
  clearCookiesAndUser,
  addToCart,
  getCart,
  getCategories,
}