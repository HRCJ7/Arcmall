import Config from 'react-native-config';
import {getForm, defaultRequestHeaders, getCookie} from '../../../../services/RestService';
import {getCategories} from '../../../../store/AsyncStorageHelper';
import { splitCategoryName } from '../../../../services/ExternalServices';
const BASE_URL: string = `${Config.API_URL}`;

export const getOptions = async () => {
  let cookie = getCookie();
  let response = await fetch(`${BASE_URL}/product/getoptions`, {
    method: 'GET',
    headers: {
      ...defaultRequestHeaders,
      cookie,
    },
    // body: getForm({country_id: value.country_id})
  });
  return response.json();
}

export const saveProduct = async (data) => {
  let cookie = getCookie();
  let response = await fetch(`${BASE_URL}/product/addproduct`, {
    method: 'POST',
    headers: {
      ...defaultRequestHeaders,
      cookie,
    },
    body: data
  });

  let resp = await response.json();
  console.log(resp);
  return resp;
}

export const getCategorydata = async (categoryData) => {
  let categoryDataNew = {...categoryData};
  
  let categories = null;
  if (categoryData) {
    categories = categoryData.categories;
    delete categoryDataNew.categories;
    delete categoryDataNew.image;
    const {name, count} = splitCategoryName(categoryData.name);
    categoryDataNew.name = name;
  } else {
    categories = await getCategories();
  }
  let cat = {};
  for (const category of categories) {
    const {name, count} = splitCategoryName(category.name);
    cat[category.category_id] = name;
  }
  return {
    formatted: cat,
    unformatted: categories,
    categoryData: categoryDataNew,
  };
}

export const filterCategory = async (categoryData, category_id) => {
  let categories = categoryData.filter(category => category.category_id === category_id)[0];
  let data = await getCategorydata(categories);
	return data;
}