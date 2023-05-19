import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { chatIdContext } from '../context/chatIdContext';

export function NewChatForm() {
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [value, setValue] = useState('+7');

  const { chatId, changeChatId } = React.useContext(chatIdContext);
  
  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    if (value.trim().length < 12) {
      setError('Номер телефона должен содержать не менее 11 цифр');
      return;
    } else if (value.trim().length > 12) {
      setError('Номер телефона должен содержать не более 11 цифр');
      return;
    } else if (/[a-zа-яё]/i.test(value)) {
      setError('Номер телефона должен содержать только цифры');
      return;
    } else if (!value.startsWith('+7')) {
      setError('Введите номер в формате +7хххххххххх');
      return;
    } else if (value.trim().includes(' ') || value.trim().includes('-')) {
      setError('Введите номер в формате +7хххххххххх без тире и пробелов');
      return;
    }
    
    changeChatId(value.substring(1));
    navigate("/chat");
  };

  return (
    <form onSubmit={handleSubmit} className='form new-chat-form'>
      <label className='form__label'>
        <span className='form__input-description'>Введите номер телефона получателя</span>
        <input 
          className='form__input' 
          type="tel" 
          value={value}
          onChange={inputChangeHandler}
        />
      </label>

      <button className='form__button' type='submit'>Создать чат</button>
      {error && <span className='form__error'>{error}</span>}
    </form>
  )
}