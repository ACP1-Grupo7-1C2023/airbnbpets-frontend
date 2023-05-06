import * as actions from './actions';

export type AppAction = ReturnType<typeof actions[keyof typeof actions]>;
