import React from 'react';
import { getUsers, signIn } from 'services/api';
import { ISignIn, useAppDispatch } from 'types/types';
import './signInPage.css';
import Button from '../../components/button';
import { setSignInLogin, setSignInPassword } from 'store/usersSlice';
import { useSelector } from 'react-redux';
import { langSelector, signInLoginSelector, signInPasswordSelector } from 'store/selectors';
import { useNavigate } from 'react-router';
import { selectLang } from 'pages/langPage/langPage';
import { useForm } from 'react-hook-form';

function SignInPage() {
  const login = useSelector(signInLoginSelector);
  const langKey = useSelector(langSelector);
  const lang = selectLang(langKey);
  const password = useSelector(signInPasswordSelector);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const sign = () => {
    dispatch(signIn({ login, password })).then((res) => {
      if (res.type === 'users/signIn/fulfilled') {
        dispatch(getUsers()).then((res) => {
          if (res.type === 'users/getUsers/fulfilled') {
            navigate('/boards');
          }
        });
      }
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignIn>();

  return (
    <form onSubmit={handleSubmit(sign)} className="sign-in-container" autoComplete="off">
      <h2>{lang.signIn.name}</h2>
      <p>{lang.signIn.title}</p>

      <label>
        {lang.signIn.login}
        <input
          type="text"
          {...register('login', { required: true, minLength: 3 })}
          onChange={(e) => dispatch(setSignInLogin(e.target.value))}
          name="login"
          value={login}
        />
        {errors.login?.type === 'required' && <span>{lang.signIn.validationRequired}</span>}
        {errors.login?.type === 'minLength' && <span>{lang.signIn.validationMinLength}</span>}
      </label>

      <label>
        {lang.signIn.password}
        <input
          type="password"
          {...register('password', { required: true, minLength: 3 })}
          onChange={(e) => dispatch(setSignInPassword(e.target.value))}
          name="password"
          value={password}
        />
        {errors.password?.type === 'required' && <span>{lang.signIn.validationRequired}</span>}
        {errors.password?.type === 'minLength' && <span>{lang.signIn.validationMinLength}</span>}
      </label>
      <Button event={undefined} name={lang.signIn.name} />
    </form>
  );
}

export default SignInPage;
