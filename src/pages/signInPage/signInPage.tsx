import React from 'react';
import { getUsers, signIn } from 'services/api';
import { useAppDispatch } from 'types/types';
import './signInPage.css';
import Button from '../../components/button';
import { setSignInLogin, setSignInPassword } from 'store/usersSlice';
import { useSelector } from 'react-redux';
import { langSelector, signInLoginSelector, signInPasswordSelector } from 'store/selectors';
import { useNavigate } from 'react-router';
import { selectLang } from 'pages/langPage/langPage';

export function SignInPage() {
  const login = useSelector(signInLoginSelector);
  const password = useSelector(signInPasswordSelector);
  const langKey = useSelector(langSelector);
  const lang = selectLang(langKey);

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

  return (
    <div className="sign-in-container">
      <h2>{lang.signIn.name}</h2>
      <p>{lang.signIn.title}</p>

      <label>{lang.signIn.login}</label>
      <input type="text" onChange={(e) => dispatch(setSignInLogin(e.target.value))} />

      <label>{lang.signIn.password}</label>
      <input type="text" onChange={(e) => dispatch(setSignInPassword(e.target.value))} />

      {/* <button onClick={sign}>SIGNIN</button> */}
      <Button event={sign} name={lang.signIn.name} />
    </div>
  );
}
