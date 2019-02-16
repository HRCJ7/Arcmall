// @flow
import { POST, GET } from "../../../services/RestService";
import { COOKIE_LANGUAGE } from "../../../Constants";

const urlFactory = {
  setLanguage: (): string => 'language/set',
  setPassword: (): string => '/password/changepassword',
  getAddresses: (): string => '/address',
  setProfile: (): string => '/useredit'
   
};

const UserService = {
  setProfile: async (firstName,lastName,email,mobileNumber): Promise<any> => {
    const endpoint: string = urlFactory.setProfile();
    const body = {firstName,lastName,email,mobileNumber}
    const urlParams = null;
    const headers = null;
    return POST(endpoint, body, urlParams, headers);
  },
  setLanguage: async (code): Promise<any> => {
    const endpoint: string = urlFactory.setLanguage();
    const body = {code}
    const urlParams = null;
    const headers = null;
    return POST(endpoint, body, urlParams, headers);
  },
  getAddresses: async (): Promise<any> => {
    const endpoint: string = urlFactory.getAddresses();
    const urlParams = null;
    const headers = null;
    return GET(endpoint, urlParams, headers);
  },
  setPassword: async (password): Promise<any> => {
    const endpoint: string = urlFactory.setPassword();
    const body = {password}
    const urlParams = null;
    const headers = null;
    return POST(endpoint,body, urlParams, headers);
  }
};

export default UserService;
