import React, { useState } from 'react';
import { getUsers, userDelete } from 'services/api';
import { useAppDispatch } from 'types/types';
import './profilePage.css';

export function ProfilePage() {
  const dispatch = useAppDispatch();
  const users = () => dispatch(getUsers());
  const deleteUser = () => dispatch(userDelete(id));

  const [id, setId] = useState('');

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <p>Profile info with edit and delete buttons</p>
      <button onClick={users}>All Users</button>
      <br />
      <label>delete user</label>
      <input type="text" placeholder="id" onChange={(e) => setId(e.target.value)} />

      <button onClick={deleteUser}>Delete User</button>
    </div>
  );
}
