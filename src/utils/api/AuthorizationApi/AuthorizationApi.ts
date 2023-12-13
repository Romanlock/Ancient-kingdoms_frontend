import { CheckLoginResponce } from './AuthorizationResponceInterface';
import { mockedCheckLoginResponce } from '../../serverMock/AuthorizationMock/AuthorizationMock';
import axios from 'axios';

export class AuthorizationApi {
  private static instance: AuthorizationApi;
  private config!: { name: string, url: string }[];

  constructor() {
    if (AuthorizationApi.instance) {
      return AuthorizationApi.instance;
    }

    AuthorizationApi.instance = this;
    this.config = [
      { name: 'checkLogin', url: '/api/login' },
    ];
  }

  checkLogin = async (): Promise<CheckLoginResponce> => {
    const configItem = this.config.find((item) => item.name === 'checkLogin');
    if (!configItem) {
      throw new Error('Не найдена конфигурация для checkLogin');
    }

    return axios.get(configItem.url)
      .then((res) => {
        const response = res.data;
        if (response.status === 'ok') {
          return response.body;
        } else {
          console.log(response);
        }
      })
      .catch((error) => {
        console.error(error);
        console.error(error.response.data);
        return error.response.data;
      });
  }
}
