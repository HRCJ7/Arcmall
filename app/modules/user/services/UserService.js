// @flow
import {POST} from './RestService';

const urlFactory = {
  login: (): string => 'accounts/player/login',
  playerRegistration: (): string => 'players/register',
};

const loginService = {
  getLoginVerification: async (email: string, password: string): Promise<any> => {
    const endpoint: string = urlFactory.login();
    const body: {email: string, password: string} = {email, password};
    const urlParams = null;
    const headers = null;

    return POST(endpoint, body, urlParams, headers);
  },
  playerRegistration:
    async (firstName: string, lastName: string, email: string, password: string, birthday: string):
      Promise<any> => {
      const endpoint: string = urlFactory.playerRegistration();
      const body = {
        firstName,
        lastName,
        email,
        password,
        'DateOfBirth': birthday,
      };
      const urlParams = null;
      const headers = null;
      return POST(endpoint, body, urlParams, headers);
    },
};

export default loginService;
