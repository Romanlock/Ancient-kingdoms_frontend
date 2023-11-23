import { mockedGetKingdoms, mockedGetKingdom } from '../../serverMock/KingdomsMock/KingdomsMock';
import axios from 'axios';

interface GetKingdomsRequestParams {
  kingdomName: string,
  rulerName: string,
  state: string,
}

export class KingdomsApi {
  private static instance: KingdomsApi;
  config!: { name: string, url: string }[];

  constructor() {
    if (KingdomsApi.instance) {
      return KingdomsApi.instance;
    }

    KingdomsApi.instance = this;
    this.config = [
      { name: 'getKingdoms', url: '/api/kingdoms' },
      { name: 'getKingdomByID', url: '/api/kingdom' },
    ];
  }

  async getKingdoms({kingdomName, rulerName, state}: GetKingdomsRequestParams) {
    const configItem = this.config.find((item) => item.name === 'getKingdoms');
    if (!configItem) {
      throw new Error('Не найдена конфигурация для getKingdoms');
    }

    try {
      const response = await axios.get(configItem.url, {
        params: {
          kingdomName,
          rulerName,
          state,
        }
      });

      const res = response.data;
      if (res.status === 'ok') {
        return res.body;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Ошибка при выполнении запроса getKingdoms:', error);
      return mockedGetKingdoms();
    }
  }

  async getKingdomByID(id: Number) {
    const configItem = this.config.find((item) => item.name === 'getKingdomByID');
    if (!configItem) {
      throw new Error('Не найдена конфигурация для getKingdoms');
    }

    try {
      const response = await axios.get(configItem.url, {
        params: {
          id,
        }
      });

      const res = response.data;
      if (res.status === 'ok') {
        return res.body;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Ошибка при выполнении запроса getKingdoms:', error);
      return mockedGetKingdom();  
    }
  }

}
