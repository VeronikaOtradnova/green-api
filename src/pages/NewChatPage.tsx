import React, { useContext, useEffect } from 'react';
import { userContext } from '../context/userContext';
import { NewChatForm } from '../components/NewChatForm';

export function NewChatPage() {
  const contextData = useContext(userContext);

  return (
    <div className='small-container'>
      <h1 className='title'>Создайте новый чат!</h1>
      <NewChatForm />
    </div>

  )
}