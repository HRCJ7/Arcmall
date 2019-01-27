// @flow
import {POST, GET} from '../../../services/RestService';

const urlFactory = {
  getProductById: (id): string => `product/&product_id=${id}`,
  getProductList: (): string => 'product/search',
  getCategoryList: (): string => 'category/all',
  getReviews: (): string => '/product/getreviews',
  addToCart: (): string => '/cart/add',
  removeFromCart: (): string => '/cart/remove',
  editCart: (): string => '/cart/edit',
  getCart: (): string => '/cart/products'
};

const ProductService = {
  getProductById: async (id: number): Promise<any> => {
    const endpoint: string = urlFactory.getProductById(id);
    const urlParams = null;
    const headers = null;
    return GET(endpoint, urlParams, headers);
  },
  getProductList: async (body): Promise<any> => {
    const endpoint: string = urlFactory.getProductList();
    const urlParams = null;
    const headers = null;
    return POST(endpoint, body, urlParams, headers);
  },
  getCatrgoryList: async (body): Promise<any> => {
    const endpoint: string = urlFactory.getCategoryList();
    const urlParams = null;
    const headers = null;
    return GET(endpoint, urlParams, headers);
  },
  getReviews: async (body): Promise<any> => {
    const endpoint: string = urlFactory.getReviews();
    const urlParams = null;
    const headers = null;
    return POST(endpoint, body, urlParams, headers);
  },
  addToCart: async (body): Promise<any> => {
    const endpoint: string = urlFactory.addToCart();
    const urlParams = null;
    const headers = null;
    return POST(endpoint, body, urlParams, headers);
  },
  removeFromCart: async (body): Promise<any> => {
    const endpoint: string = urlFactory.removeFromCart();
    const urlParams = null;
    const headers = null;
    return POST(endpoint, body, urlParams, headers);
  },
  editCart: async (body): Promise<any> => {
    const endpoint: string = urlFactory.editCart();
    const urlParams = null;
    const headers = null;
    return POST(endpoint, body, urlParams, headers);
  },
  getCart: async (body): Promise<any> => {
    const endpoint: string = urlFactory.getCart();
    const urlParams = null;
    const headers = null;
    return POST(endpoint, body, urlParams, headers);
  },
};

export default ProductService;
