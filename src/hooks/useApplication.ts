import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";

import { ClearStore,
  SetApplications, 
  SetApplicationToCreate,
  CreateApplicationToCreate,
  SetCurrentApplication, 
  DeleteCurrentApplication,
  AddKingdomToApplication,
  DeleteApplicationToCreate,
  DeleteKingdomFromApplication,
  UpdateApplicationStatus,
  UpdateApplicationRuler,
  UpdateKingdomFromApplication,
  DeleteApplication,
  SetApplicationsAll } from "../stores/ApplicationStore";
import { Application } from "../Interfaces/dataStructures/ApplicationInterface";
import { KingdomWithTerm, Kingdom } from "../Interfaces/dataStructures/KingdomInterface";
import { ApplicationApi } from "../utils/api/ApplicationApi/ApplicationApi";
import { ResponseDefault } from "../utils/api/ResponseInterface";


export function useApplication() {
  const applicationsApi = new ApplicationApi();

  const { 
      applications, 
      currentApplication, 
      applicationToCreate,
      applicationsCount,
      applicationToCreateKingdomsCount,
      applicationsAll,
      applicationsAllCount,
  } = useSelector((store: any) => store.application);

  const dispatch = useDispatch();

  const clearStore = () => {
    dispatch(ClearStore());
  }

  const setApplications = async (id: Number | null) => {    
    try {
      const response = await applicationsApi.getApplicationsById(id);
      if (response.Status === 'ok') {   // case successful
        dispatch(SetApplications(response.Body));

        const inDevelopment = response.Body.find((application: Application) => {
          return application.State === 'В разработке';
        });
    
        if (inDevelopment) {
          return setApplicationToCreate(inDevelopment.Id!);
        }

        return { result: true, response };
      } else if (response.Status === 'error') {  // case error
        const inDevelopment = applications?.find((application: Application) => {
          return application.State === 'В разработке';
        });
    
        if (inDevelopment) {
          return setApplicationToCreate(inDevelopment.Id!);
        } 

        dispatch(SetApplications([]));

        return { result: false, response }
      } else {  // case no connect to server
        const response: ResponseDefault = {
          Code: 503,
          Status: 'error',
          Message: 'Нет связи с сервером',
          Body: null,
        }
        
        return { result: false, response };
      } 
    } catch (error: any) {
      dispatch(ClearStore());

      const response: ResponseDefault = {
        Code: 418,
        Status: 'undefined error',
        Message: error,
        Body: null,
      }

      return { result: false, response };
    }
  }

  const setCurrentApplication = async (id: Number) => {
    try {
      const response = await applicationsApi.getApplicationWithKingdoms(id);
      if (response.Status === 'ok') {   // case successful
        const application: Application = {
          Id: response.Body.Application.Id,
          State: response.Body.Application.State, 
          DateCreate: response.Body.Application.DateCreate,
          DateSend: response.Body.Application.DateSend,
          DateComplete: response.Body.Application.DateComplete,
          Ruler: response.Body.Application.Ruler,
          Creator: response.Body.Application.Creator,
          CreatorId: response.Body.Application.CreatorRefer,
          Moderator: response.Body.Application.Moderator,
          ModeratorId: response.Body.Application.ModeratorRefer,
          Check: response.Body.Application.Check,
          KingdomsWithTerm: response.Body.Kingdoms,
        }
        dispatch(SetCurrentApplication(application));

        return { result: true, response }
      } else if (response.Status === 'error') {  // case error
        dispatch(SetCurrentApplication(null));

        return { result: false, response }
      } else {  // case no connect to server
        const response: ResponseDefault = {
          Code: 503,
          Status: 'error',
          Message: 'Нет связи с сервером',
          Body: null,
        }
        
        return { result: false, response};
      } 
    } catch (error: any) {
      const response: ResponseDefault = {
        Code: 418,
        Status: 'undefined error',
        Message: error,
        Body: null,
      }

      return { result: false, response };
    }
  }

  const setApplicationToCreate = async (id: Number) => {
    try {
      const response = await applicationsApi.getApplicationWithKingdoms(id);
      if (response.Status === 'ok') {   // case successful
        const application: Application = {
          Id: response.Body.Application.Id,
          State: response.Body.Application.State, 
          DateCreate: response.Body.Application.DateCreate,
          DateSend: response.Body.Application.DateSend,
          DateComplete: response.Body.Application.DateComplete,
          Ruler: response.Body.Application.Ruler,
          Creator: response.Body.Application.Creator,
          CreatorId: response.Body.Application.CreatorRefer,
          Moderator: response.Body.Application.Moderator,
          ModeratorId: response.Body.Application.ModeratorRefer,
          Check: response.Body.Application.Check,
          KingdomsWithTerm: response.Body.Kingdoms,
        }
        dispatch(SetApplicationToCreate(application));

        return { result: true, response }
      } else if (response.Status === 'error') {  // case error

        return { result: false, response }
      } else {  // case no connect to server
        const response: ResponseDefault = {
          Code: 503,
          Status: 'error',
          Message: 'Нет связи с сервером',
          Body: null,
        }
        
        return { result: false, response};
      } 
    } catch (error: any) {
      const response: ResponseDefault = {
        Code: 418,
        Status: 'undefined error',
        Message: error,
        Body: null,
      }

      return { result: false, response };
    }
  }

  const deleteCurrentApplication = () => {    //unused
    dispatch(DeleteCurrentApplication());
  }

  const deleteApplicationToCreate = () => {   // unused
    dispatch(DeleteApplicationToCreate());
  }

  const addKingdomToApplication = async (dateFrom: Date, dateTo: Date, kingdom: Kingdom) => {
    for (const kingdomWT of applicationToCreate?.KingdomsWithTerm || []) {
      if (kingdomWT.Kingdom.Name === kingdom.Name) {
        const response: ResponseDefault = {
          Code: 400,
          Status: 'error',
          Message: 'Это княжество уже добавлено в запись',
          Body: null,
        };
        
        return { result: false, response };
      }
    }
      
    try {
      const response = await applicationsApi.addKingdomToApplication(applicationToCreate.Id,
        dateFrom, dateTo, kingdom.Id);
      if (response.Status === 'ok') {   // case successful
        const kingdomWithTerm: KingdomWithTerm = {
          Kingdom: kingdom,
          From: dateFrom,
          To: dateTo,
        }

        dispatch(AddKingdomToApplication(kingdomWithTerm));

        return { result: true, response }
      } else if (response.Status === 'error') {  // case error

        return { result: false, response }
      } else {  // case no connect to server
        const response: ResponseDefault = {
          Code: 503,
          Status: 'error',
          Message: 'Нет связи с сервером',
          Body: null,
        }
        
        return { result: false, response };
      } 
    } catch (error: any) {
      console.log(error)
      const response: ResponseDefault = {
        Code: 418,
        Status: 'undefined error',
        Message: error,
        Body: null,
      }

      return { result: false, response };
    }
  }

  const deleteKingdomFromApplication = async (kingdomId: Number) => {
    try {
      const response = await applicationsApi.deleteKingdomFromApplication(kingdomId, 
        applicationToCreate.Id);
      if (response.Status === 'ok') {   // case successful
        dispatch(DeleteKingdomFromApplication(kingdomId));

        return { result: true, response }
      } else if (response.Status === 'error') {  // case error

        return { result: false, response }
      } else {  // case no connect to server
        const response: ResponseDefault = {
          Code: 503,
          Status: 'error',
          Message: 'Нет связи с сервером',
          Body: null,
        }
        
        return { result: false, response};
      } 
    } catch (error: any) {
      console.log(error)

      const response: ResponseDefault = {
        Code: 418,
        Status: 'undefined error',
        Message: error,
        Body: null,
      }

      return { result: false, response };
    }
  }

  const updateApplicationStatus = async (applicationId: Number, state: string) => {
    try {
      const response = await applicationsApi.updateApplicationStatus(applicationId, state);
      if (response.Status === 'ok') {   // case successful
        dispatch(UpdateApplicationStatus());

        return { result: true, response }
      } else if (response.Status === 'error') {  // case error

        return { result: false, response }
      } else {  // case no connect to server
        const response: ResponseDefault = {
          Code: 503,
          Status: 'error',
          Message: 'Нет связи с сервером',
          Body: null,
        }
        
        return { result: false, response};
      } 
    } catch (error: any) {
      console.log(error)
      const response: ResponseDefault = {
        Code: 418,
        Status: 'undefined error',
        Message: error,
        Body: null,
      }

      return { result: false, response };
    }
  }

  const createApplication = async (dateFrom: Date, dateTo: Date, kingdom: Kingdom) => {
    try {
      const response = await applicationsApi.createApplication(dateFrom, dateTo, kingdom.Id);
      if (response.Status === 'ok') {   // case successful
        const application: Application = {
          Id: response.Body.Application.Id,
          State: response.Body.Application.State, 
          DateCreate: response.Body.Application.DateCreate,
          DateSend: response.Body.Application.DateSend,
          DateComplete: response.Body.Application.DateComplete,
          Ruler: response.Body.Application.Ruler,
          Creator: response.Body.Application.Creator,
          CreatorId: response.Body.Application.CreatorRefer,
          Moderator: response.Body.Application.Moderator,
          ModeratorId: response.Body.Application.ModeratorRefer,
          Check: response.Body.Application.Check,
          KingdomsWithTerm: response.Body.Kingdoms,
        }
        dispatch(CreateApplicationToCreate(application))

        return { result: true, response }
      } else if (response.Status === 'error') {  // case error

        return { result: false, response }
      } else {  // case no connect to server
        const response: ResponseDefault = {
          Code: 503,
          Status: 'error',
          Message: 'Нет связи с сервером',
          Body: null,
        }
        
        return { result: false, response };
      } 
    } catch (error: any) {
      console.log(error)
      const response: ResponseDefault = {
        Code: 418,
        Status: 'undefined error',
        Message: error,
        Body: null,
      }

      return { result: false, response };
    }
  }

  const deleteApplication = async (applicationId: Number) => {
    try {
      const response = await applicationsApi.deleteApplication(applicationId);
      if (response.Status === 'ok') {   // case successful
        dispatch(DeleteApplication(applicationId));

        return { result: true, response }
      } else if (response.Status === 'error') {  // case error

        return { result: false, response }
      } else {  // case no connect to server
        const response: ResponseDefault = {
          Code: 503,
          Status: 'error',
          Message: 'Нет связи с сервером',
          Body: null,
        }
        
        return { result: false, response};
      } 
    } catch (error: any) {
      console.log(error)

      const response: ResponseDefault = {
        Code: 418,
        Status: 'undefined error',
        Message: error,
        Body: null,
      }

      return { result: false, response };
    }
  }

  const updateApplicationRuler = async (applicationId: Number, ruler: string) => {
    try {
      const response = await applicationsApi.updateApplicationRuler(applicationId, ruler);
      if (response.Status === 'ok') {   // case successful
        dispatch(UpdateApplicationRuler(ruler));

        return { result: true, response }
      } else if (response.Status === 'error') {  // case error

        return { result: false, response }
      } else {  // case no connect to server
        const response: ResponseDefault = {
          Code: 503,
          Status: 'error',
          Message: 'Нет связи с сервером',
          Body: null,
        }
        
        return { result: false, response};
      } 
    } catch (error: any) {
      console.log(error)
      const response: ResponseDefault = {
        Code: 418,
        Status: 'undefined error',
        Message: error,
        Body: null,
      }

      return { result: false, response };
    }
  }

  const updateKingdomFromApplication = async (dateFrom: Date, dateTo: Date, kingdom: Kingdom) => {     
    try {
      const response = await applicationsApi.updateKingdomFromApplication(applicationToCreate.Id,
        dateFrom, dateTo, kingdom.Id);
      if (response.Status === 'ok') {   // case successful
        const kingdomWithTerm: KingdomWithTerm = {
          Kingdom: kingdom,
          From: dateFrom,
          To: dateTo,
        }

        dispatch(UpdateKingdomFromApplication(kingdomWithTerm));

        return { result: true, response }
      } else if (response.Status === 'error') {  // case error

        return { result: false, response }
      } else {  // case no connect to server
        const response: ResponseDefault = {
          Code: 503,
          Status: 'error',
          Message: 'Нет связи с сервером',
          Body: null,
        }
        
        return { result: false, response };
      } 
    } catch (error: any) {
      console.log(error)
      const response: ResponseDefault = {
        Code: 418,
        Status: 'undefined error',
        Message: error,
        Body: null,
      }

      return { result: false, response };
    }
  }


  const debounce = (func: any, delay: number) => {
    let timeoutId: any;
    return function (...args: any[]): Promise<{ result: boolean; response: ResponseDefault; }> {
      return new Promise((resolve, reject) => {
        const executeFunction = async () => {
          try {
            const result = await func(...args);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        };
  
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
  
        timeoutId = setTimeout(executeFunction, delay);
      });
    };
  };  


  // moderator functions

  const setApplicationsAll = async (status: string, dateFrom: Date, dateTo: Date) => {    
    try {
      const response = await applicationsApi.getAllApplications(status, dateFrom, dateTo);
      if (response.Status === 'ok') {   // case successful
        dispatch(SetApplicationsAll(response.Body));

        return { result: true, response };
      } else if (response.Status === 'error') {  // case error

        return { result: false, response }
      } else {  // case no connect to server
        const response: ResponseDefault = {
          Code: 503,
          Status: 'error',
          Message: 'Нет связи с сервером',
          Body: null,
        }
        
        return { result: false, response };
      } 
    } catch (error: any) {
      dispatch(ClearStore());

      const response: ResponseDefault = {
        Code: 418,
        Status: 'undefined error',
        Message: error,
        Body: null,
      }

      return { result: false, response };
    }
  }

  const debounceTime = 1000;

  const debouncedSetApplications = useCallback(debounce(setApplications, debounceTime), [setApplications]);
  const debouncedSetCurrentApplication = useCallback(debounce(setCurrentApplication, debounceTime), [setCurrentApplication]);
  const debouncedSetApplicationToCreate = useCallback(debounce(setApplicationToCreate, debounceTime), [setApplicationToCreate]);
  const debouncedDeleteCurrentApplication = useCallback(debounce(deleteCurrentApplication, debounceTime), [deleteCurrentApplication]);
  const debouncedDeleteApplicationToCreate = useCallback(debounce(deleteApplicationToCreate, debounceTime), [deleteApplicationToCreate]);
  const debouncedAddKingdomToApplication = useCallback(debounce(addKingdomToApplication, debounceTime), [addKingdomToApplication]);
  const debouncedDeleteKingdomFromApplication = useCallback(debounce(deleteKingdomFromApplication, debounceTime), [deleteKingdomFromApplication]);
  const debouncedUpdateApplicationStatus = useCallback(debounce(updateApplicationStatus, debounceTime), [updateApplicationStatus]);
  const debouncedCreateApplication = useCallback(debounce(createApplication, debounceTime), [createApplication]);

  // return {
  //   applications,
  //   currentApplication,
  //   applicationToCreate,
  //   applicationsCount,
  //   applicationToCreateKingdomsCount,
  //   setApplications: debouncedSetApplications,
  //   setCurrentApplication: debouncedSetCurrentApplication,
  //   setApplicationToCreate: debouncedSetApplicationToCreate,
  //   deleteCurrentApplication: debouncedDeleteCurrentApplication,
  //   deleteApplicationToCreate: debouncedDeleteApplicationToCreate,
  //   addKingdomToApplication: debouncedAddKingdomToApplication,
  //   deleteKingdomFromApplication: debouncedDeleteKingdomFromApplication,
  //   updateApplicationStatus: debouncedUpdateApplicationStatus,
  //   createApplication: debouncedCreateApplication,
  // };

  return {
    applications,
    currentApplication,
    applicationToCreate,
    applicationsCount,
    applicationToCreateKingdomsCount,

    applicationsAll,
    applicationsAllCount,
    
    clearStore,
    setApplications,
    setCurrentApplication,
    setApplicationToCreate,
    deleteCurrentApplication,
    deleteApplicationToCreate,
    addKingdomToApplication,
    deleteKingdomFromApplication,
    updateApplicationStatus,
    updateApplicationRuler,
    updateKingdomFromApplication,
    createApplication,
    deleteApplication,

    setApplicationsAll,

  };
}
