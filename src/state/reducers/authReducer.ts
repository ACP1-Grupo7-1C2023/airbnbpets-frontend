import { AnyAction, Reducer } from 'redux';

export type AuthState = {
  token: string | null;
}

const initialState: AuthState = {
  token: null
};

const authReducer: Reducer<AuthState, AnyAction> = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return { token: action.payload };
    case "LOGOUT":
      return { token: null };
    default:
      return state;
  }
}

export default authReducer;