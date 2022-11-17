import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleAddBoardModal } from 'store/boardsSlice';
import style from './index.module.css';

const Header = () => {
  const dispatch = useDispatch();

  const openModal = () => {
    dispatch(toggleAddBoardModal(true));
  };

  return (
    <header className={style.wrapper}>
      <Link to="/" className={style.link}>
        Home
      </Link>
      <Link to="/boards" className={style.link}>
        Boards
      </Link>
      <a className={style.link} onClick={openModal}>
        Add board
      </a>
      <Link to="/search" className={style.link}>
        Search
      </Link>
      <Link to="/lang" className={style.link}>
        Language
      </Link>
      <Link to="/profile" className={style.link}>
        Profile
      </Link>
      <Link to="/signIn" className={style.link}>
        Sign in
      </Link>
      <Link to="/signUp" className={style.link}>
        Sign up
      </Link>
    </header>
  );
};

export default Header;
