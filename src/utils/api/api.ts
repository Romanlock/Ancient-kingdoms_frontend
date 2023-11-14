import axios from 'axios';
import { response } from 'express';

export class Api {
  private static instance: Api;
  config!: { name: string, url: string }[];

  constructor() {
    if (Api.instance) {
      return Api.instance;
    }

    Api.instance = this;
    this.config = [
      { name: 'getKingdoms', url: '/api/kingdoms' },
    ];
  }

  async getKingdoms(ruler: string, state: string) {
    const configItem = this.config.find((item) => item.name === 'getKingdoms');
    if (!configItem) {
      throw new Error('Не найдена конфигурация для getKingdoms');
    }

    try {
      const response = await axios.get(configItem.url, {
        params: {
          ruler,
          state
        }
      });

      const res = response.data;
      if (res.status === 'ok') {
        return res.body;
      // } else if (res.status === 'error' &&
      //            res.message === 'error getting necessary kingdoms: record not found') {
      //             return null;
      } else {
        return null;

        //throw new Error('Ошибка при выполнении запроса getKingdoms');
      }
    } catch (error) {
      // console.log(response)
      console.error('Ошибка при выполнении запроса getKingdoms:', error);
      return null;
      // throw error;
    }
  }
}
