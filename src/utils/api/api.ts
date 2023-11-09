import axios from 'axios';

export class Api {
    private static instance: Api;
    config!: { name: string, url: string }[];

    constructor() {
        if (Api.instance) {
            return Api.instance;
        }

        Api.instance = this;
        this.config = [
            {name: 'getKingdoms', url: 'http://localhost:8000/kingdoms'},
        ]

    }

    async getKingdoms(ruler: string, state: string) {
        const configItem = this.config.find((item) => item.name === 'getKingdoms');
        if (!configItem) {
            throw new Error('Не найдена конфигурация для getKingdoms');
        }

        try {
          const configItem = this.config.find((item) => item.name === 'getKingdoms');
          if (!configItem) {
            throw new Error('Не найдена конфигурация для getKingdoms');
          }
      
          const response = await axios.get(configItem.url, {
            params: {
              ruler,
              state
            }
          });
      
          const res = response.data;
          if (res.status === 'ok') {
            return res.body;
          } else {
            throw new Error('Ошибка при выполнении запроса getKingdoms');
          }
        } catch (error) {
          console.error('Ошибка при выполнении запроса getKingdoms:', error);
          throw error;
        }
      }

}