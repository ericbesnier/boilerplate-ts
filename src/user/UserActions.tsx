import { USER_API } from '../api/UserApi';
import { LOGIN, LOGOUT } from '../constants/const';

/**
 * Définitions des actions pour le reducer Picture
 */
export const login = (email: string, password: string) => {
  console.log('UserActions/login');
  return {
    type: LOGIN,
    payload: USER_API.login(email, password)
  };
}

export const logout = (email: string, password: string) => {
  console.log('UserActions/logout');
  return {
    type: LOGOUT,
    payload: USER_API.logout(email, password)
  };
}