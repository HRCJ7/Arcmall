// @flow
import { POST } from "../../../services/RestService";
import { COOKIE_LANGUAGE } from "../../../Constants";

const urlFactory = {
  setLanguage: (): string => 'language/set',
};

const UserService = {
  setLanguage: async (code): Promise<any> => {
    const endpoint: string = urlFactory.setLanguage();
    const body = {code}
    const urlParams = null;
    const headers = null;
    return POST(endpoint, body, urlParams, headers, [COOKIE_LANGUAGE]);
  },
};

export default UserService;
