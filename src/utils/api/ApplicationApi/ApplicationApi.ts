import axios from "axios";
import { Application } from "../../../Interfaces/dataStructures/ApplicationInterface";
import { ApplicationStatusRequest } from "./ApplicationRequestInterfaces";
import { ResponseDefault } from "../ResponseInterface";

export class ApplicationApi {
  private static instance: ApplicationApi;
  private config! : { name: string, url: string }[];

  constructor() {
    if (ApplicationApi.instance) {
      return ApplicationApi.instance;
    }

    ApplicationApi.instance = this;

    this.config = [
      { name: 'getApplicationsById', url: '/api/applications' },
      { name: 'getApplicationWithKingdoms', url: '/api/application/with_kingdoms' },
      { name: 'updateApplicationStatus', url: '/api/application/status' },
    ];
  }

  getApplicationsById = async (applicationId: Number | null): Promise<ResponseDefault> => {
    const configItem = this.config.find((item) => item.name === 'getApplicationsById');
    if (!configItem) {
      throw new Error('Не найдена конфигурация для getApplicationsById');
    }

    const headers = {
      credenlials: 'include',
    }

    return axios.get(
      configItem.url, 
      {
        headers,
        params: {
          'Id': applicationId,
        }
      },
      )
        .then((res) => {
          return  res.data;
        })
        .catch((error) => {
          return error.response.data;
        });
  }

  getApplicationWithKingdoms = async (applicationId: Number): Promise<ResponseDefault> => {
    const configItem = this.config.find((item) => item.name === 'getApplicationWithKingdoms');
    if (!configItem) {
      throw new Error('Не найдена конфигурация для getApplicationWithKingdoms');
    }

    const headers = {
      credenlials: 'include',
    }

    return axios.get(
      configItem.url, 
      {
        headers,
        params: {
          'Id': applicationId,
        }
      },
      )
        .then((res) => {
          return  res.data;
        })
        .catch((error) => {
          return error.response.data;
        });
  }

  updateApplicationStatus = async (applicationId: Number, state: string): Promise<ResponseDefault> => {
    const configItem = this.config.find((item) => item.name === 'updateApplicationStatus');
    if (!configItem) {
      throw new Error('Не найдена конфигурация для updateApplicationStatus');
    }

    const headers = {
      credenlials: 'include',
    }

    const body: ApplicationStatusRequest = {
      Id: applicationId,
      State: state,
    }

    return axios.put(
      configItem.url,
      body, 
      {
        headers,
        params: {
          'Id': applicationId,
        }
      },
      )
        .then((res) => {
          return  res.data;
        })
        .catch((error) => {
          return error.response.data;
        });
  }
}
