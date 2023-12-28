import axios from 'axios';

import { ResponseDefault } from '../ResponseInterface';
import { LoginRequest } from './AuthorizationRequestInterfaces';


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
      { name: 'login', url: '/api/login' },
      { name: 'signup', url: '/api/signup' },
      { name: 'logout', url: '/api/logout' },
    ];
  }

  checkLogin = async (): Promise<ResponseDefault> => {
    const configItem = this.config.find((item) => item.name === 'checkLogin');
    if (!configItem) {
      throw new Error('Не найдена конфигурация для checkLogin');
    }

    const headers = {
      credenlials: 'include',
    }

    return axios.get(
      configItem.url,
      { headers })
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }

  login = async (name: string, password: string): Promise<ResponseDefault> => {
    const configItem = this.config.find((item) => item.name === 'login');
    if (!configItem) {
      throw new Error('Не найдена конфигурация для checkLogin');
    }

    const headers = {
      credenlials: 'include',
    }

    const body: LoginRequest = {
      Name: name,
      Password: password,
    }

    return axios.post(
      configItem.url,
      body,
      { headers },
      )
      .then((res) => {
        const response = res.data;
        return response;
      })
      .catch((error) => {
        return error.response.data;
      });
  }

  signup = async (name: string, password: string): Promise<ResponseDefault> => {
    const configItem = this.config.find((item) => item.name === 'signup');
    if (!configItem) {
      throw new Error('Не найдена конфигурация для signup');
    }

    const headers = {
      credenlials: 'include',
    }

    const body: LoginRequest = {
      Name: name,
      Password: password,
    }

    return axios.post(
      configItem.url,
      body,
      { headers },
      )
      .then((res) => {
        const response = res.data;
        return response;
      })
      .catch((error) => {
        return error.response.data;
      });
  }

  logout = async (): Promise<ResponseDefault> => {
    const configItem = this.config.find((item) => item.name === 'logout');
    if (!configItem) {
      throw new Error('Не найдена конфигурация для logout');
    }

    const headers = {
      credenlials: 'include',
    }

    return axios.delete(
      configItem.url,
      { headers },
      )
      .then((res) => {
        const response = res.data;
        return response;
      })
      .catch((error) => {
        return error.response.data;
      });
  }
}
