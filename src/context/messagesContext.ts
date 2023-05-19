import React from 'react';

type messageType = 'message message_incoming' | 'message message_outgoing';

export interface IMessage {
  value: string;
  className: messageType;
  id: number;
}

export interface IMessagesContext {
  allMessages: IMessage[];
  changeAllMessages: (arr: IMessage[]) => void;
}

export const messagesContext = React.createContext<IMessagesContext>({
  allMessages: [],
  changeAllMessages: () => {},
})