import React, { useState } from 'react';
import { signUp } from 'services/api';
import { useAppDispatch } from 'types/types';
import './signUpPage.css';

export function SignUpPage() {
  const dispatch = useAppDispatch();
  const sign = () => dispatch(signUp({ name, login, password }));

  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="sign-up-container">
      <h2>Sign up</h2>
      <p>Sign up form</p>

      <label>Name</label>
      <input type="text" onChange={(e) => setName(e.target.value)} />

      <label>Login</label>
      <input type="text" onChange={(e) => setLogin(e.target.value)} />

      <label>Password</label>
      <input type="text" onChange={(e) => setPassword(e.target.value)} />

      <button onClick={sign}>REG</button>
    </div>
  );
}
