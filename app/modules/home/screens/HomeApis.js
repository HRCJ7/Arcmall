import Config from 'react-native-config';
import {getForm, defaultRequestHeaders, getCookie} from '../../../../services/RestService';
import {getCategories} from '../../../../store/AsyncStorageHelper';
import { splitCategoryName } from '../../../../services/ExternalServices';


const BASE_URL: string = `${Config.API_URL}`;

export const getOptions = async () => {
  let response = await fetch(`${BASE_URL}/product/getoptions`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      ...defaultRequestHeaders,
    },
    // body: getForm({country_id: value.country_id})
  });
  return response.json();
}