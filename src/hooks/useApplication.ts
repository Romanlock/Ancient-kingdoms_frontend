import { useDispatch, useSelector } from "react-redux";

import { SetApplications, CreateCurrentApplication, AddKingdomToApplication } from "../stores/ApplicationStore";
import { Application } from "../Interfaces/dataStructures/ApplicationInterface";
import { KingdomWithTerm } from "../Interfaces/dataStructures/KingdomInterface";


export function useApplication() {

    const { 
      applications, 
      currentApplication, 
      applicationsCount } = useSelector((store: any) => store.application);

    const dispatch = useDispatch();

    const setApplications = (applications: Application[]) => {
      dispatch(SetApplications(applications));
    }

    const createCurrentApplication = (currentApplication: Application) => {
      dispatch(CreateCurrentApplication(currentApplication))
    }

    const addKingdomToApplication = (kingdom: KingdomWithTerm) => {
      dispatch(AddKingdomToApplication(kingdom));
    }

    return {
      applications,
      currentApplication,
      applicationsCount,
      setApplications,
      createCurrentApplication,
      addKingdomToApplication,
    }
}