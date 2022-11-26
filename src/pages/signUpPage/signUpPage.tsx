import { selectLang } from 'pages/langPage/langPage';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { signUp } from 'services/api';
import { langSelector } from 'store/selectors';
import { useAppDispatch } from 'types/types';
import './signUpPage.css';

export function SignUpPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const langKey = useSelector(langSelector);
  const lang = selectLang(langKey);

  const sign = () => {
    dispatch(signUp({ name, login, password }));
    navigate('/signin');
  };

  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="sign-up-container">
      <h2>{lang.signUp.name}</h2>
      <p>{lang.signUp.title}</p>

      <label>{lang.signUp.userName}</label>
      <input type="text" onChange={(e) => setName(e.target.value)} />

      <label>{lang.signUp.login}</label>
      <input type="text" onChange={(e) => setLogin(e.target.value)} />

      <label>{lang.signUp.password}</label>
      <input type="text" onChange={(e) => setPassword(e.target.value)} />

      <button onClick={sign}>{lang.signUp.button}</button>
    </div>
  );
}
