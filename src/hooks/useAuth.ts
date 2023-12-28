import { useDispatch, useSelector } from "react-redux";

import { SetUser, DeleteUser } from "../stores/UserStore";
import { User } from "../Interfaces/dataStructures/UserInterface";
import { AuthorizationApi } from "../utils/api/AuthorizationApi/AuthorizationApi";


export function useAuth() {
  const authorizationApi = new AuthorizationApi();
  const { user, isAuthorized, isModerator } = useSelector((store: any) => store.user);

  const dispatch = useDispatch();

  const setUser = (user: User) => {
    dispatch(SetUser(user));
  }

  const deleteUser = () => {
    dispatch(DeleteUser());
  }

  const checkLogin = async () => {
    const response = await authorizationApi.checkLogin();
    if (response.Status === "ok") {
      const user: User = {
        Id: response.Body.Id,
        Name: response.Body.Name,
        Role: response.Body.Role,
        Password: null,
      }

      setUser(user);
    }
  }

  const login = async (name: string, password: string) => {
    const response = await authorizationApi.login(name, password);
    if (response.Status === "ok") {
      const user: User = {
        Id: response.Body.Id,
        Name: response.Body.Name,
        Role: response.Body.Role,
        Password: null,
      }

      setUser(user);
    } else {
      return response.Message;
    }
  }

  const signup = async (name: string, password: string) => {
    const response = await authorizationApi.signup(name, password);
    if (response.Status === 'ok') {
      return login(name, password);
    }

    return response.Message;
  }

  const logout = async () => {
    const response = await authorizationApi.logout();
    if (response.Status === "ok") {
      deleteUser();
    } else {
      checkLogin();
    }
  }

  return {
    user,
    isAuthorized,
    isModerator,
    setUser,
    checkLogin,
    login,
    signup,
    logout,
  }
}