import React, { useState } from 'react';
import { getUsers, signIn } from 'services/api';
import { ISignIn, useAppDispatch } from 'types/types';
import './signInPage.css';
import Button from '../../components/button';
import { setSignInLogin } from 'store/usersSlice';
import { useSelector } from 'react-redux';
import { langSelector, signInLoginSelector } from 'store/selectors';
import { useNavigate } from 'react-router';
import { selectLang } from 'pages/langPage/langPage';
import { useForm } from 'react-hook-form';

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

  const {
    register,
    formState: { errors },
  } = useForm<ISignIn>();

  const [password, setPassword] = useState('');

  return (
    <form className="sign-in-container">
      <h2>{lang.signIn.name}</h2>
      <p>{lang.signIn.title}</p>

      <label>
        {lang.signIn.login}
        <input
          type="text"
          {...register('login', { required: true, minLength: 3 })}
          onChange={(e) => dispatch(setSignInLogin(e.target.value))}
          name="login"
        />
        {errors.login?.type === 'required' && <span>{lang.signIn.validationRequired}</span>}
        {errors.login?.type === 'minLength' && <span>{lang.signIn.validationMinLength}</span>}
      </label>

      <label>
        {lang.signIn.password}
        <input
          type="password"
          {...register('password', { required: true, minLength: 3 })}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
        />
        {errors.login?.type === 'required' && <span>{lang.signIn.validationRequired}</span>}
        {errors.login?.type === 'minLength' && <span>{lang.signIn.validationMinLength}</span>}
      </label>

      {/* <button onClick={sign}>SIGNIN</button> */}
      <Button event={sign} name={lang.signIn.name} />
    </form>
  );
}
