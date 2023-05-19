import React, { useEffect, useRef, useState } from 'react';
import { chatIdContext } from '../context/chatIdContext';
import { userContext } from '../context/userContext';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { IMessage, messagesContext } from '../context/messagesContext';
import { useGetMessage } from '../hooks/useGetMessage';

export function Chat() {
  const { chatId, changeChatId } = React.useContext(chatIdContext);
  const {id, token} = React.useContext(userContext);
  const {allMessages, changeAllMessages} = React.useContext(messagesContext);
  const [newMessageValue, setNewMessageValue] = useState('');

  useGetMessage();

  const messageChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessageValue(event.target.value);
  }

  function sendAndSaveMessage() {
    async function sendMessage() {
      const response = await fetch(`https://api.green-api.com/waInstance${id}/SendMessage/${token}`, {
        method: 'POST',
        body: JSON.stringify({
          chatId: `${chatId}@c.us`,
          message: newMessageValue,
        }),
        headers: {
          'Content-Type': 'application/json',
        }
      });

    }

    sendMessage();

    changeAllMessages([...allMessages, {
      value: newMessageValue,
      className: 'message message_outgoing', 
      id: Date.now(),     
    }])

    setNewMessageValue('');
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    sendAndSaveMessage();
  }

  return (
    <> 
      <header className='chat-header'>
        <h1 className='title'>{`Чат с +${chatId}`}</h1>
      </header>

      <SimpleBar style={{ width: '100%', height: '100%' }}>
        <main className='chat-main'>
          {allMessages.map((message: IMessage): React.ReactNode => <div className={message.className} key={message.id}>{message.value}</div>)}
        </main>
      </SimpleBar>

      <form className='message-form' onSubmit={handleSubmit}>
        <input 
          className='form__input message-form__input' 
          value={newMessageValue}
          onChange={messageChangeHandler}
        />
        <button className='message-form__button'></button>
      </form>
    </> 
  )
}