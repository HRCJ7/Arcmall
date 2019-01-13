// @flow
import {POST, GET} from '../../../services/RestService';

const urlFactory = {
  getProductById: (id): string => `product/&product_id=${id}`,
  playerRegistration: (): string => 'players/register',
};

const ProductService = {
  getProductById: async (id: number): Promise<any> => {
    const endpoint: string = urlFactory.getProductById(id);
    const urlParams = null;
    const headers = null;
    return GET(endpoint, urlParams, headers);
  },
};

export default ProductService;
