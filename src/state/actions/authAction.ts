import { AppDispatch } from "..";
import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

export type AuthAction = {
  type: "LOGIN",
  payload: string;
}  | {
  type: "LOGOUT",
}

export const login = (email: string, password: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.post(`${baseURL}/login`, {email, password});
    dispatch({ type: "LOGIN", payload: response.data });
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

export const signup = (name: string, lastName: string, email: string, password: string, type: 'petSitter' | 'host') => async (dispatch: AppDispatch) => {
  try {
    console.log({
      name, lastName, email, password, type
    })
    let response = await axios.post(`${baseURL}/users`, {name, lastName, email, password, type});
    // response contains id
    console.log(response.data);
    response = await axios.post(`${baseURL}/login`, {email, password});
    dispatch({ type: "LOGIN", payload: response.data });
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw e.response?.data ?? 'Unexpected error occurred';
    }
    throw 'Unexpected error occurred';
  }
}