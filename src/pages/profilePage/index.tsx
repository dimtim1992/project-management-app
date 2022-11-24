import { selectLang } from 'pages/langPage/langPage';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getUsers, userDelete } from 'services/api';
import { langSelector } from 'store/selectors';
import { useAppDispatch } from 'types/types';
import style from './index.module.css';

const ProfilePage = () => {
  const langKey = useSelector(langSelector);
  const dispatch = useAppDispatch();
  const users = () => dispatch(getUsers());
  const deleteUser = () => dispatch(userDelete(id));
  const lang = selectLang(langKey);

  const [id, setId] = useState('');

  return (
    <div className={style.wrapper}>
      <h2>Profile</h2>
      <p>{lang.profilePage.text}</p>
      <button onClick={users}>All Users</button>
      <br />
      <label>delete user</label>
      <input type="text" placeholder="id" onChange={(e) => setId(e.target.value)} />

      <button onClick={deleteUser}>Delete User</button>
    </div>
  );
};

export default ProfilePage;
