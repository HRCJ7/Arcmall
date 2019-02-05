// @flow
import {POST, GET} from '../../../services/RestService';

const urlFactory = {
  addToCart: (): string => '/cart/add',
  removeFromCart: (): string => '/cart/remove',
  editCart: (): string => '/cart/edit',
  getCart: (): string => '/cart/products',

  addToWishList: (): string => '/wishlist/add',
  removeFromWishList: (): string => '/wishlist/remove',
  getWishList: (): string => '/wishlist'
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
    return POST(endpoint, urlParams, headers);
  },
  addToWishList: async (body): Promise<any> => {
    const endpoint: string = urlFactory.addToWishList();
    const urlParams = null;
    const headers = null;
    return POST(endpoint, body, urlParams, headers);
  },
  removeFromWishList: async (body): Promise<any> => {
		console.log('TCL: body', body)
    const endpoint: string = urlFactory.removeFromWishList();
    const urlParams = null;
    const headers = null;
    return POST(endpoint, body, urlParams, headers);
  },
  getWishList: async (body): Promise<any> => {
    const endpoint: string = urlFactory.getWishList();
    const urlParams = null;
    const headers = null;
    return GET(endpoint, urlParams, headers);
  },
}

export default CartService;
