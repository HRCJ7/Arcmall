// @flow
import {POST} from '../../../services/RestService';

const urlFactory = {
  login: (): string => 'user_login',
  saveAddress: (): string => 'address/save',
};

const loginService = {
  login: async (email: string, password: string): Promise<any> => {
    const endpoint: string = urlFactory.login();
    const body: {email: string, password: string} = {email, password};
    const urlParams = null;
    const headers = null;

    // console.log(endpoint)

    return POST(endpoint, body, urlParams, headers);
  },
  saveAddress:
    async (firstName: string, lastName: string, email: string, password: string, birthday: string):
      Promise<any> => {
      const endpoint: string = urlFactory.saveAddress();
      // const body = {
      //   firstName,
      //   lastName,
      //   email,
      //   password,
      //   'DateOfBirth': birthday,
      // };
      const urlParams = null;
      const headers = null;
      let body = {
            "firstname": "Risina",
            "lastname": "Perera",
            "address_1": "196",
            "city": "Pannipitiya",
            "country_id": "1",
            "zone_id": "3030"
    }
      return POST(endpoint, body, urlParams, headers);
    },
};

export default loginService;
