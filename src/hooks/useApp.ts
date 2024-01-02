import { useDispatch, useSelector } from "react-redux";

import {  SetCurrentPage,
  DeleteCurrentPage } from '../stores/AppStore';


export function useApp() {
  const { currentPage } = useSelector((store: any) => store.app);

  const dispatch = useDispatch();

  const setCurrentPage = (pageName: string) => {
    dispatch(SetCurrentPage(pageName));
  }

  const deleteCurrentPage = () => {
    dispatch(DeleteCurrentPage());
  }

  return {
    currentPage,
    setCurrentPage,
    deleteCurrentPage,
  };
}