// @flow
import { POST, GET } from "../../../services/RestService";
import { COOKIE_LANGUAGE } from "../../../Constants";

const urlFactory = {
  setLanguage: (): string => 'language/set',
  getAddresses: (): string => '/address',
};

const UserService = {
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
};

export default UserService;
