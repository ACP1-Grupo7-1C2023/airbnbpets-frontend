import { RootState } from "..";

export const getToken = (state: RootState) => state.auth.session?.token;