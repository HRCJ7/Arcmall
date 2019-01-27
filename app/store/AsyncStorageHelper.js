import {AsyncStorage} from 'react-native';
import { STORAGE_USER, COOKIE_PHPSSID, COOKIE_CURENCY, COOKIE_LANGUAGE } from '../Constants';

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
  console.log(user)
  return user;
}

export {
  clearCookies,
  getCookies,
  getUser,
  clearCookiesAndUser,
}