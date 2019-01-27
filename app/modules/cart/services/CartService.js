// @flow
import {POST, GET} from '../../../services/RestService';

const urlFactory = {
  addToCart: (): string => '/cart/add',
  removeFromCart: (): string => '/cart/remove',
  editCart: (): string => '/cart/edit',
  getCart: (): string => '/cart/products'
};

const CartService = {
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
}

export default CartService;
