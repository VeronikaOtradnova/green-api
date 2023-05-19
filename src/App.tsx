import React, { useState } from 'react';
import './App.css';
import { Route, Routes} from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { NewChatPage } from './pages/NewChatPage';
import { ChatPage } from './pages/ChatPage';
import { userContext } from './context/userContext';
import { chatIdContext } from './context/chatIdContext';
import {IMessage, messagesContext} from './context/messagesContext';

function App() {

  const [id, setId] = useState('');
  const [token, setToken] = useState('');
  const UserProvider = userContext.Provider;

  const [chatId, setChatId] = useState('+7');
  const ChatIdProvider = chatIdContext.Provider;

  const [allMessages, setAllMessages] = useState<IMessage[]>([]);
  const MessagesProvider = messagesContext.Provider;

  return (
    <UserProvider value={{
      id: id,
      changeId: setId,
      token: token,
      changeToken: setToken
    }}>
      <ChatIdProvider value={{
        chatId: chatId, 
        changeChatId: setChatId ,
      }}>
        <MessagesProvider value={{
          allMessages: allMessages,
          changeAllMessages: setAllMessages,
        }}>
        <div className='app'>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/new-chat" element={<NewChatPage />} />
            <Route path="/chat" element={<ChatPage />} />
          </Routes>
        </div>
        </MessagesProvider>
      </ChatIdProvider>
    </UserProvider>
  );
}

export default App;
