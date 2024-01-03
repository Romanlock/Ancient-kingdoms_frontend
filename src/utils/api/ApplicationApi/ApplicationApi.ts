import axios from "axios";
import { Application } from "../../../Interfaces/dataStructures/ApplicationInterface";
import { ApplicationStatusRequest, 
  AddKingdomToApplicationRequest,
  DeleteKingdomFromApplicationRequest, 
  CreateApplicationAndAddKingdom,
  ApplicationRulerRequest} from "./ApplicationRequestInterfaces";
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
      { name: 'addKingdomToApplication', url: '/api/application/add_kingdom' },
      { name: 'deleteKingdomFromApplication', url: '/api/application/delete_kingdom' },
      { name: 'createApplication', url: '/api/application/create' },
      { name: 'deleteApplication', url: '/api/application/delete' },
      { name: 'updateApplication', url: '/api/application/update' },
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
      },
      )
        .then((res) => {
          return  res.data;
        })
        .catch((error) => {
          return error.response.data;
        });
  }

  addKingdomToApplication = async (applicationId: Number, dateFrom: Date,
    dateTo: Date, kingdomId: Number): Promise<ResponseDefault> => {
    const configItem = this.config.find((item) => item.name === 'addKingdomToApplication');
    if (!configItem) {
      throw new Error('Не найдена конфигурация для addKingdomToApplication');
    }

    const headers = {
      credenlials: 'include',
    }

    const body: AddKingdomToApplicationRequest = {
      ApplicationId: applicationId,
      KingdomId: kingdomId,
      From: dateFrom,
      To: dateTo,
    }

    return axios.put(
      configItem.url,
      body, 
      {
        headers,
      },
      )
        .then((res) => {
          return  res.data;
        })
        .catch((error) => {
          return error.response.data;
        });
  }

  deleteKingdomFromApplication = async (kingdomId: Number, 
    applicationId: Number): Promise<ResponseDefault> => {
      
    const configItem = this.config.find((item) => item.name === 'deleteKingdomFromApplication');
    if (!configItem) {
      throw new Error('Не найдена конфигурация для deleteKingdomFromApplication');
    }

    const headers = {
      credenlials: 'include',
    }

    const body: DeleteKingdomFromApplicationRequest = {
      ApplicationId: applicationId,
      KingdomId: kingdomId,
    }

    return axios.delete(
      configItem.url,
      {
        data: body,
        headers,
      }
      )
        .then((res) => {
          return  res.data;
        })
        .catch((error) => {
          return error.response.data;
        });
  }

  createApplication = async (dateFrom: Date, dateTo: Date, 
    kingdomId: Number): Promise<ResponseDefault> =>  {
    const configItem = this.config.find((item) => item.name === 'createApplication');
    if (!configItem) {
      throw new Error('Не найдена конфигурация для createApplication');
    }

    const headers = {
      credenlials: 'include',
    }

    const body: CreateApplicationAndAddKingdom = {
      KingdomId: kingdomId,
      From: dateFrom,
      To: dateTo,
    }

    return axios.post(
      configItem.url, 
      body, 
      {
        headers,
      },
      )
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
          return error.response.data;
        });
  }

  deleteApplication = async (applicationId: Number): Promise<ResponseDefault> => {
    const configItem = this.config.find((item) => item.name === 'deleteApplication');
    if (!configItem) {
      throw new Error('Не найдена конфигурация для deleteApplication');
    }

    const headers = {
      credenlials: 'include',
    }

    const body = {
      Id: applicationId,
    }

    return axios.delete(
      configItem.url,
      {
        data: body,
        headers,
      }
      )
        .then((res) => {
          return  res.data;
        })
        .catch((error) => {
          return error.response.data;
        });
  }

  updateApplication = async (id: Number, ruler: string): Promise<ResponseDefault> => {
    const configItem = this.config.find((item) => item.name === 'updateApplication');
    if (!configItem) {
      throw new Error('Не найдена конфигурация для updateApplication');
    }

    const headers = {
      credenlials: 'include',
    }

    const body: ApplicationRulerRequest = {
      Id: id,
      Ruler: ruler,
    }

    return axios.put(
      configItem.url,
      body, 
      {
        headers,
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
