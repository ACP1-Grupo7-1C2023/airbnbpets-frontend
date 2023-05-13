import { AnyAction, Reducer } from 'redux';

export type Session = {
  token: string;
  email: string;
  type: 'petSitter' | 'host';
}

export type AuthState = {
  session: Session | null;
}

const initialState: AuthState = {
  session: null
};

const authReducer: Reducer<AuthState, AnyAction> = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return { session: action.payload };
    case "LOGOUT":
      return { session: null };
    default:
      return state;
  }
}

export default authReducer;