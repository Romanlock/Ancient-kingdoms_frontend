import { mockedGetKingdoms, mockedGetKingdom } from '../../serverMock/KingdomsMock/KingdomsMock';
import axios from 'axios';
import { Kingdom } from '../../../Interfaces/dataStructures/KingdomInterface';

export class KingdomsApi {
  private static instance: KingdomsApi;
  private config!: { name: string, url: string }[];

  constructor() {
    if (KingdomsApi.instance) {
      return KingdomsApi.instance;
    }

    KingdomsApi.instance = this;
    this.config = [
      { name: 'getKingdomsByName', url: '/api/kingdoms' },
      { name: 'getKingdomByID', url: '/api/kingdom' },
    ];
  }

  getKingdomsByName = async (kingdomName: string): Promise<Kingdom[]> => {
    const configItem = this.config.find((item) => item.name === 'getKingdomsByName');
    if (!configItem) {
      throw new Error('Не найдена конфигурация для getKingdoms');
    }

    return axios.get(configItem.url, {
      params: {
        'kingdom_name': kingdomName,
      }
    })
      .then((res) => {
        const response = res.data;
        if (response.status === 'ok') {
          return response.body;
        } else {
          mockedGetKingdoms();
        }
      })
      .catch(() => mockedGetKingdoms());
  }

  getKingdomByID = async (id: Number): Promise<Kingdom> => {
    const configItem = this.config.find((item) => item.name === 'getKingdomByID');
    if (!configItem) {
      throw new Error('Не найдена конфигурация для getKingdomByID');
    }

    return axios.get(configItem.url, {
      params: {
        'id': id,
      }
    })
      .then((res) => {
        const response = res.data;
        if (response.status === 'ok') {
          return response.body;
        } else {
          mockedGetKingdom();
        }
      })
      .catch(() => mockedGetKingdoms());
  }
}
