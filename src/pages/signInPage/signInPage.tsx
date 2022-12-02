import React, { useState } from 'react';
import { getUsers, signIn } from 'services/api';
import { useAppDispatch } from 'types/types';
import './signInPage.css';
import Button from '../../components/button';
import { setSignInLogin } from 'store/usersSlice';
import { useSelector } from 'react-redux';
import { langSelector, signInLoginSelector } from 'store/selectors';
import { useNavigate } from 'react-router';
import { selectLang } from 'pages/langPage/langPage';

export function SignInPage() {
  const login = useSelector(signInLoginSelector);
  const langKey = useSelector(langSelector);
  const lang = selectLang(langKey);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const sign = async () => {
    await dispatch(signIn({ login, password }));
    await dispatch(getUsers());
    navigate('/boards');
  };

  const [password, setPassword] = useState('');

  return (
    <div className="sign-in-container">
      <h2>{lang.signIn.name}</h2>
      <p>{lang.signIn.title}</p>

      <label>{lang.signIn.login}</label>
      <input type="text" onChange={(e) => dispatch(setSignInLogin(e.target.value))} required />

      <label>{lang.signIn.password}</label>
      <input type="text" onChange={(e) => setPassword(e.target.value)} required />

      {/* <button onClick={sign}>SIGNIN</button> */}
      <Button event={sign} name={lang.signIn.name} />
    </div>
  );
}
