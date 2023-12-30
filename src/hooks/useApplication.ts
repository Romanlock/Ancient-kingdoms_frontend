import { useDispatch, useSelector } from "react-redux";

import { SetApplications, 
  SetApplicationToCreate,
  SetCurrentApplication, 
  DeleteCurrentApplication,
  AddKingdomToApplication,
  DeleteApplicationToCreate,
  DeleteKingdomFromApplication,
  UpdateApplicationStatus } from "../stores/ApplicationStore";
import { Application } from "../Interfaces/dataStructures/ApplicationInterface";
import { KingdomWithTerm, Kingdom } from "../Interfaces/dataStructures/KingdomInterface";
import { ApplicationApi } from "../utils/api/ApplicationApi/ApplicationApi";
import { ResponseDefault } from "../utils/api/ResponseInterface";
import { User } from "../Interfaces/dataStructures/UserInterface";


export function useApplication() {
  const applicationsApi = new ApplicationApi();

  const { 
      applications, 
      currentApplication, 
      applicationToCreate,
      applicationsCount,
      applicationToCreateKingdomsCount,
  } = useSelector((store: any) => store.application);

  const dispatch = useDispatch();

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

        return { result: true, response }
      } else if (response.Status === 'error') {  // case error
        dispatch(SetApplications([]));

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
        // dispatch(DeleteApplicationToCreate());

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

  const deleteCurrentApplication = () => {
    dispatch(DeleteCurrentApplication());
  }

  const deleteApplicationToCreate = () => {
    dispatch(DeleteApplicationToCreate());
  }

  const addKingdomToApplication = 
    async (dateFrom: Date, dateTo: Date, kingdom: Kingdom) => {

    console.log(kingdom)
      
    try {
      const response = await applicationsApi.addKingdomToApplication(applicationToCreate.Id,
        dateFrom, dateTo, kingdom.Id);
      if (response.Status === 'ok') {   // case successful
        const kingdomWithTerm: KingdomWithTerm = {
          Kingdom: kingdom,
          From: dateFrom,
          To: dateTo,
        }
        console.log(kingdomWithTerm)
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

  return {
    applications,
    currentApplication,
    applicationToCreate,
    applicationsCount,
    applicationToCreateKingdomsCount,
    setApplications,
    setApplicationToCreate,
    setCurrentApplication,
    deleteCurrentApplication,
    addKingdomToApplication,
    deleteApplicationToCreate,
    deleteKingdomFromApplication,
    updateApplicationStatus,
  }
}