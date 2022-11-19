import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toggleAddBoardModal } from 'store/boardsSlice';
import { isAuthorizedSelector } from 'store/selectors';
import { logOut } from 'store/usersSlice';
import style from './index.module.css';

const Header = () => {
  const isAuthorized = useSelector(isAuthorizedSelector);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const openModal = () => {
    dispatch(toggleAddBoardModal(true));
  };

  const onLogOut = () => {
    dispatch(logOut());
    navigate('/');
  };

  return (
    <header className={style.wrapper}>
      <Link to="/" className={style.link}>
        Home
      </Link>
      {isAuthorized && (
        <Link to="/boards" className={style.link}>
          Boards
        </Link>
      )}
      {isAuthorized && (
        <a className={style.link} onClick={openModal}>
          Add board
        </a>
      )}
      {isAuthorized && (
        <Link to="/search" className={style.link}>
          Search
        </Link>
      )}
      <Link to="/lang" className={style.link}>
        Language
      </Link>
      {isAuthorized && (
        <Link to="/profile" className={style.link}>
          Profile
        </Link>
      )}
      <Link to="/signIn" className={style.link}>
        Sign in
      </Link>
      <Link to="/signUp" className={style.link}>
        Sign up
      </Link>
      {isAuthorized && (
        <a className={style.link} onClick={onLogOut}>
          Log out
        </a>
      )}
    </header>
  );
};

export default Header;
