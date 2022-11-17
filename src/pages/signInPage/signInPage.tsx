import React, { useState } from 'react';
import { signIn } from 'services/api';
import { useAppDispatch } from 'types/types';
import './signInPage.css';

export function SignInPage() {
  const dispatch = useAppDispatch();
  const sign = () => dispatch(signIn({ login, password }));

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="sign-in-container">
      <h2>Sign in</h2>
      <p>Sign in form</p>

      <label>Login</label>
      <input type="text" onChange={(e) => setLogin(e.target.value)} />

      <label>Password</label>
      <input type="text" onChange={(e) => setPassword(e.target.value)} />

      <button onClick={sign}>SIGNIN</button>
    </div>
  );
}
