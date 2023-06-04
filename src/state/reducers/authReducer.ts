import { AnyAction, Reducer } from 'redux';
import { UserType } from '../../interfaces/AppInterfaces';

export type Session = {
  token: string;
  email: string;
  type: UserType;
  subscription: string;
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
    case "CHANGE_SUB":
      return state.session ? { session: { ...state.session, subscription: action.payload } } : { session: null };
    default:
      return state;
  }
}

export default authReducer;