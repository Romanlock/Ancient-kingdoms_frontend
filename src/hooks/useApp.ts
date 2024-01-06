import { useDispatch, useSelector } from "react-redux";

import {  SetCurrentPage,
  DeleteCurrentPage,
  SetKingdomFeedNameFilter,
  DeleteKingdomFeedNameFilter,
  SetModeratorAllKingdomsNameFilter,
  DeleteModeratorAllKingdomsNameFilter,
  SetModeratorApplicationFeedStatusFilter,
  DeleteModeratorApplicationFeedStatusFilter,
  SetModeratorApplicationFeedUsernameFilter,
  DeleteModeratorApplicationFeedUsernameFilter,
  SetModeratorApplicationFeedDateFromFilter,
  DeleteModeratorApplicationFeedDateFromFilter,
  SetModeratorApplicationFeedDateToFilter,
  DeleteModeratorApplicationFeedDateToFilter } from '../stores/AppStore';


export function useApp() {
  const { currentPage,
    kingdomFeedNameFilter,
    moderatorAllKingdomsNameFilter,
    moderatorApplicationFeedStatusFilter,
    moderatorApplicationFeedUsernameFilter,
    moderatorApplicationFeedDateFromFilter,
    moderatorApplicationFeedDateToFilter 
  } = useSelector((store: any) => store.app);

  const dispatch = useDispatch();

  const setCurrentPage = (pageName: string) => {
    dispatch(SetCurrentPage(pageName));
  }

  const deleteCurrentPage = () => {
    dispatch(DeleteCurrentPage());
  }

  const setKingdomFeedNameFilter = (nameFilter: string) => {
    dispatch(SetKingdomFeedNameFilter(nameFilter));
  }

  const deleteKingdomFeedNameFilter = () => {
    dispatch(DeleteKingdomFeedNameFilter());
  }

  const setModeratorAllKingdomsNameFilter = (nameFilter: string) => {
    dispatch(SetModeratorAllKingdomsNameFilter(nameFilter));
  }

  const deleteModeratorAllKingdomsNameFilter = () => {
    dispatch(DeleteModeratorAllKingdomsNameFilter());
  }

  const setModeratorApplicationFeedStatusFilter = (statusFilter: string) => {
    dispatch(SetModeratorApplicationFeedStatusFilter(statusFilter));
  }

  const deleteModeratorApplicationFeedStatusFilter = () => {
    dispatch(DeleteModeratorApplicationFeedStatusFilter());
  }

  const setModeratorApplicationFeedUsernameFilter = (usernameFilter: string) => {
    dispatch(SetModeratorApplicationFeedUsernameFilter(usernameFilter));
  }

  const deleteModeratorApplicationFeedUsernameFilter = () => {
    dispatch(DeleteModeratorApplicationFeedUsernameFilter());
  }

  const setModeratorApplicationFeedDateFromFilter = (dateFrom: Date) => {
    dispatch(SetModeratorApplicationFeedDateFromFilter(dateFrom));
  }

  const deleteModeratorApplicationFeedDateFromFilter = () => {
    dispatch(DeleteModeratorApplicationFeedDateFromFilter());
  }

  const setModeratorApplicationFeedDateToFilter = (dateTo: Date) => {
    dispatch(SetModeratorApplicationFeedDateToFilter(dateTo));
  }

  const deleteModeratorApplicationFeedDateToFilter = () => {
    dispatch(DeleteModeratorApplicationFeedDateToFilter());
  }

  return {
    currentPage,
    kingdomFeedNameFilter,
    moderatorAllKingdomsNameFilter,
    moderatorApplicationFeedStatusFilter,
    moderatorApplicationFeedUsernameFilter,
    moderatorApplicationFeedDateFromFilter,
    moderatorApplicationFeedDateToFilter,
    setCurrentPage,
    deleteCurrentPage,
    setKingdomFeedNameFilter,
    deleteKingdomFeedNameFilter,
    setModeratorAllKingdomsNameFilter,
    deleteModeratorAllKingdomsNameFilter,
    setModeratorApplicationFeedStatusFilter,
    deleteModeratorApplicationFeedStatusFilter,
    setModeratorApplicationFeedUsernameFilter,
    deleteModeratorApplicationFeedUsernameFilter,
    setModeratorApplicationFeedDateFromFilter,
    deleteModeratorApplicationFeedDateFromFilter,
    setModeratorApplicationFeedDateToFilter,
    deleteModeratorApplicationFeedDateToFilter,
  };
}
