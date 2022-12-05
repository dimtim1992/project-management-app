import { selectLang } from 'pages/langPage/langPage';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { signUp } from 'services/api';
import { langSelector, userProfileSelector } from 'store/selectors';
import { setUserLogin, setUserName, setUserPassword } from 'store/usersSlice';
import { ISignUp, useAppDispatch } from 'types/types';
import './signUpPage.css';
import { useForm, SubmitHandler } from 'react-hook-form';

function SignUpPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const langKey = useSelector(langSelector);
  const lang = selectLang(langKey);
  const profile = useSelector(userProfileSelector);

  const sign = async () => {
    await dispatch(signUp(profile));
    navigate('/signin');
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUp>();

  return (
    <form onSubmit={handleSubmit(sign)} className="sign-up-container" autoComplete="off">
      <h2>{lang.signUp.name}</h2>
      <p>{lang.signUp.title}</p>

      <label>{lang.signUp.userName}</label>
      <input
        type="text"
        onChange={(e) => dispatch(setUserName(e.target.value))}
        value={profile.name}
      />

      <label>{lang.signUp.login}</label>
      <input
        type="text"
        onChange={(e) => dispatch(setUserLogin(e.target.value))}
        value={profile.login}
      />

      <label>
        {lang.signUp.password}
        <input
          type="password"
          {...register('password', { required: true, minLength: 3 })}
          onChange={(e) => dispatch(setUserPassword(e.target.value))}
          name="password"
          value={profile.password}
        />
        {errors.password?.type === 'required' && <span>{lang.signUp.validationRequired}</span>}
        {errors.password?.type === 'minLength' && <span>{lang.signUp.validationMinLength}</span>}
      </label>

      <button>{lang.signUp.button}</button>
    </form>
  );
}

export default SignUpPage;
