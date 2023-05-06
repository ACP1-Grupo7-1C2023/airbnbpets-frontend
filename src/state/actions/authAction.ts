import { AppDispatch } from "..";
import axios from "axios";

export type AuthAction = {
  type: "LOGIN",
  payload: string;
} | {
  type: "LOGOUT",
}

export const login = (email: string, password: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.post("https://airbnbpets-api-wqqh.onrender.com/login", {email, password});
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

export const register = (name: string, lastname: string, email: string, password: string) => async (dispatch: AppDispatch) => {
  try {
    let response = await axios.post("https://airbnbpets-api-wqqh.onrender.com/users", {name, lastname, email, password});
    console.log(response.data);
    response = await axios.post("https://airbnbpets-api-wqqh.onrender.com/login", {email, password});
    dispatch({ type: "LOGIN", payload: response.data });
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw e.response?.data ?? 'Unexpected error occurred';
    }
    throw 'Unexpected error occurred';
  }
}