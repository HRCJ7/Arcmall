import Config from 'react-native-config';
import {getForm, defaultRequestHeaders, getCookie} from '../../../../services/RestService';
import {getCategories} from '../../../../store/AsyncStorageHelper';
import { splitCategoryName } from '../../../../services/ExternalServices';


const BASE_URL: string = `${Config.API_URL}`;

export const setLanguage = async (code) => {
  let response = await fetch(`${BASE_URL}/language/set`, {
    method: 'POST',
    headers: {
      ...defaultRequestHeaders,
    },
    body: getForm({code})
  });
  return response.json();
}