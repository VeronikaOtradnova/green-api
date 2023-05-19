import React from 'react';
import { LoginForm } from '../components/LoginForm';

export function LoginPage() {
  return (
    <div className='small-container'>
      <h1 className='title'>Авторизация</h1>
      <LoginForm />
    </div>
  )
}