import React from 'react';
import { Link } from 'react-router-dom';
import style from './index.module.css';

const Header = () => {
  return (
    <header className={style.wrapper}>
      <Link to="/" className={style.link}>
        Home
      </Link>
      <Link to="/boards" className={style.link}>
        Boards
      </Link>
      <Link to="/add" className={style.link}>
        Add board
      </Link>
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
