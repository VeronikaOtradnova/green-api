import React from "react";

export interface IChatIdContext {
  chatId: string;
  changeChatId: (chatId: string) => void;
}

export const chatIdContext = React.createContext<IChatIdContext>({
  chatId: '',
  changeChatId: () => {},
});

