import React, { useEffect } from 'react';
import { userContext } from '../context/userContext';
import { messagesContext } from '../context/messagesContext';
import { chatIdContext } from '../context/chatIdContext';

export function useGetMessage() {
  const {id, token} = React.useContext(userContext);
  const {allMessages, changeAllMessages} = React.useContext(messagesContext);
  const { chatId, changeChatId } = React.useContext(chatIdContext);

  async function getMessage() {
    const response = await fetch(`https://api.green-api.com/waInstance${id}/ReceiveNotification/${token}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const incommingMessage = await response.json();
    console.log(incommingMessage);

    if (incommingMessage && incommingMessage.body.messageData.typeMessage === 'textMessage' && incommingMessage.body.senderData.chatId === `${chatId}@c.us`) {
      changeAllMessages([...allMessages, {
        value: incommingMessage.body.messageData.textMessageData.textMessage,
        className: 'message message_incoming',
        id: Date.now(), 
      }])

      console.log(allMessages);

      removeMessageNotification(incommingMessage.receiptId);
    } else if (incommingMessage) {
      removeMessageNotification(incommingMessage.receiptId);
    }
  }
  
  async function removeMessageNotification(receiptId: number) {
    const response = await fetch(`https://api.green-api.com/waInstance${id}/DeleteNotification/${token}/${receiptId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }

  useEffect(() => {
    const timer = setInterval(() => {
      getMessage();
    }, 3000);

    return () => clearInterval(timer);
  }, [allMessages])
}