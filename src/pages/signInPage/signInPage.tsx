import React, { useState } from 'react';
import { getUsers, signIn } from 'services/api';
import { useAppDispatch } from 'types/types';
import './signInPage.css';
import Button from '../../components/button';
import { setSignInLogin } from 'store/usersSlice';
import { useSelector } from 'react-redux';
import { signInLoginSelector } from 'store/selectors';
import { useNavigate } from 'react-router';

export function SignInPage() {
  const login = useSelector(signInLoginSelector);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const sign = async () => {
    await dispatch(signIn({ login, password }));
    await dispatch(getUsers());
    navigate('/');
  };

  const [password, setPassword] = useState('');

  return (
    <div className="sign-in-container">
      <h2>Sign in</h2>
      <p>Sign in form</p>

      <label>Login</label>
      <input type="text" onChange={(e) => dispatch(setSignInLogin(e.target.value))} />

      <label>Password</label>
      <input type="text" onChange={(e) => setPassword(e.target.value)} />

      {/* <button onClick={sign}>SIGNIN</button> */}
      <Button event={sign} name="SIGN IN" />
    </div>
  );
}
