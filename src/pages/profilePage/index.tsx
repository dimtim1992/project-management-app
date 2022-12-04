import { selectLang } from 'pages/langPage/langPage';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { userDelete, userUpdate } from 'services/api';
import { langSelector, userProfileSelector } from 'store/selectors';
import { setUserLogin, setUserName, setUserPassword } from 'store/usersSlice';
import { useAppDispatch } from 'types/types';
import style from './index.module.css';

const ProfilePage = () => {
  const langKey = useSelector(langSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const lang = selectLang(langKey);
  const profile = useSelector(userProfileSelector);
  const userId = localStorage.getItem('userId');
  const userName = profile.name;
  const userLogin = profile.login;
  const userPassword = profile.password;

  const deleteUser = () => {
    dispatch(userDelete(userId));
    navigate('/');
  };

  const onSave = () => {
    dispatch(
      userUpdate({
        id: userId,
        name: userName,
        login: userLogin,
        password: userPassword,
      })
    );
  };

  return (
    <div className={style.wrapper}>
      <h2>Profile</h2>
      <p>{lang.profilePage.text}</p>
      <form autoComplete="off">
        <label>{lang.profilePage.name}</label>
        <input
          type="text"
          onChange={(e) => dispatch(setUserName(e.target.value))}
          value={profile.name}
        />
        <label>{lang.profilePage.login}</label>
        <input
          type="text"
          onChange={(e) => dispatch(setUserLogin(e.target.value))}
          value={profile.login}
        />
        <label>{lang.profilePage.password}</label>
        <input
          type="password"
          onChange={(e) => dispatch(setUserPassword(e.target.value))}
          value={profile.password}
        />
        <button onClick={onSave}>{lang.profilePage.save}</button>
        <br />
        <button onClick={deleteUser}>{lang.profilePage.deleteUser}</button>
      </form>
    </div>
  );
};

export default ProfilePage;
