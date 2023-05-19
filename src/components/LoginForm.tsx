import React, { useContext, useState } from 'react';
import { userContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';

interface IUserData {
  id: string;
  token: string;
}

const userData: IUserData = {
  id: '',
  token: '',
}

export function LoginForm() {
  const [error, setError] = useState('');
  const { id, changeId, token, changeToken} = useContext(userContext);
  const navigate = useNavigate();

  const idChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeId(event.target.value);
  }
  const tokenChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeToken(event.target.value);
  }

  const submitHandler =  (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    if (id.trim().length === 0 || token.trim().length === 0) {
      setError('Пожалуйста, введите IdInstance и ApiTokenInstance');
      return;
    }

    navigate("/new-chat");
  }

  return (
    <>
    <form onSubmit={submitHandler} className='form'>
      <label className='form__label'>
        <span className='form__input-description'>IdInstance</span>
        <input 
          className='form__input' type="text" 
          value={id}
          onChange={idChangeHandler}
        />
      </label>

      <label className='form__label'>
        <span className='form__input-description'>ApiTokenInstance</span>
        <input 
          className='form__input' type="password" 
          value={token}
          onChange={tokenChangeHandler}
        />
      </label>

      <button className='form__button' type='submit'>Войти</button>
      {error && <span className='form__error'>{error}</span>}

    </form>
    </>
  )
}