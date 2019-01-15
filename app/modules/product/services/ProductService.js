// @flow
import {POST, GET} from '../../../services/RestService';

const urlFactory = {
  getProductById: (id): string => `product/&product_id=${id}`,
  getProductList: (): string => 'product/search',
  getCategoryList: (): string => 'category/all',
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
};

export default ProductService;
