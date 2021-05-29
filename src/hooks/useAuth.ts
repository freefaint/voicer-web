import { useCallback, useEffect, useState } from "react";
import { IUser } from "../types/users";
import * as AuthService from '../rest/auth';

export const useAuth = () => {
  const [ user, setUser ] = useState<IUser>();

  const login = useCallback((user: { login: string, password: string }) => {
    AuthService.login(user).then(setUser);
  }, []);

  const logout = useCallback(() => {
    AuthService.logout().then(() => {
      setUser(undefined);
    });
  }, []);

  useEffect(() => {
    AuthService.getUser().then(setUser);
  }, []);

  return {
    user,
    login,
    logout
  };
}