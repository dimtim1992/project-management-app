import { selectLang } from 'pages/langPage/langPage';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { signUp } from 'services/api';
import { langSelector } from 'store/selectors';
import { ISignUp, useAppDispatch } from 'types/types';
import './signUpPage.css';
import { useForm, SubmitHandler } from 'react-hook-form';

export function SignUpPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const langKey = useSelector(langSelector);
  const lang = selectLang(langKey);

  const sign: SubmitHandler<ISignUp> = () => {
    dispatch(signUp({ name, login, password }));
    navigate('/signin');
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUp>();

  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form onSubmit={handleSubmit(sign)} className="sign-up-container">
      <h2>{lang.signUp.name}</h2>
      <p>{lang.signUp.title}</p>

      <label>
        {lang.signUp.userName}
        <input
          type="text"
          {...register('name', { required: true, minLength: 3 })}
          onChange={(e) => setName(e.target.value)}
          name="name"
        />
        {errors.name?.type === 'required' && <span>{lang.signUp.validationRequired}</span>}
        {errors.name?.type === 'minLength' && <span>{lang.signUp.validationMinLength}</span>}
      </label>

      <label>
        {lang.signUp.login}
        <input
          type="text"
          {...register('login', { required: true, minLength: 3 })}
          onChange={(e) => setLogin(e.target.value)}
          name="login"
        />
        {errors.login?.type === 'required' && <span>{lang.signUp.validationRequired}</span>}
        {errors.login?.type === 'minLength' && <span>{lang.signUp.validationMinLength}</span>}
      </label>

      <label>
        {lang.signUp.password}
        <input
          type="password"
          {...register('password', { required: true, minLength: 3 })}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
        />
        {errors.login?.type === 'required' && <span>{lang.signUp.validationRequired}</span>}
        {errors.login?.type === 'minLength' && <span>{lang.signUp.validationMinLength}</span>}
      </label>

      <button>{lang.signUp.button}</button>
    </form>
  );
}
