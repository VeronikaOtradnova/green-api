import React from "react";

export interface IUserContext {
  id: string;
  changeId: (id: string) => void;
  token: string;
  changeToken: (token: string) => void;
}

export const userContext = React.createContext<IUserContext>({
  id: '',
  changeId: () => {},
  token: '',
  changeToken: () => {},
})
