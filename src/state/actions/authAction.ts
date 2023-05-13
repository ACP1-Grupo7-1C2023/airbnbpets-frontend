import { AppDispatch } from "..";
import axios from "axios";
import { UserType } from "../../interfaces/AppInterfaces";
import { Session } from "../reducers/authReducer";

const baseURL = process.env.REACT_APP_API_URL;

export type AuthAction = {
  type: "LOGIN",
  payload: Session;
}  | {
  type: "LOGOUT",
}

export const login = (email: string, password: string, type: UserType) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.post(`${baseURL}/login`, { email, password, type });
    dispatch({ type: "LOGIN", payload: { token: response.data, email, type } });
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw e.response?.data ?? 'Unexpected error occurred';
    }
    throw 'Unexpected error occurred';
  }
}

export const logout = () => (dispatch: AppDispatch) => {
  dispatch({ type: "LOGOUT" });
}

export const signup = (name: string, lastName: string, email: string, password: string, type: UserType) => async (dispatch: AppDispatch) => {
  try {
    let response = await axios.post(`${baseURL}/users`, { name, lastName, email, password, type });
    response = await axios.post(`${baseURL}/login`, { email, password, type });
    dispatch({ type: "LOGIN", payload: { token: response.data, email, type }});
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw e.response?.data ?? 'Unexpected error occurred';
    }
    throw 'Unexpected error occurred';
  }
}