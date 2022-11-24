import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toggleAddBoardModal } from 'store/boardsSlice';
import { isAuthorizedSelector, langSelector } from 'store/selectors';
import { logOut } from 'store/usersSlice';
import style from './index.module.css';
import { langChange } from 'pages/langPage/langPage';

const Header = () => {
  const isAuthorized = useSelector(isAuthorizedSelector);
  const currentLang = useSelector(langSelector);
  const lang = langChange(currentLang, 'header');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const openModal = () => {
    dispatch(toggleAddBoardModal(true));
  };

  const onLogOut = () => {
    dispatch(logOut());
    navigate('/');
  };

  const [sticky, setSticky] = useState(false);

  const handleScroll = () => {
    window.pageYOffset > 14 ? setSticky(true) : setSticky(false);
  };
  window.addEventListener('scroll', handleScroll);

  return (
    <header className={sticky ? style.stickyWrapper : style.wrapper}>
      <Link to="/" className={style.link}>
        {lang?.home}
      </Link>
      {isAuthorized && (
        <Link to="/boards" className={style.link}>
          {lang?.boards}
        </Link>
      )}
      {isAuthorized && (
        <a className={style.link} onClick={openModal}>
          {lang?.addBoard}
        </a>
      )}
      {isAuthorized && (
        <Link to="/search" className={style.link}>
          {lang?.search}
        </Link>
      )}
      <Link to="/lang" className={style.link}>
        {lang?.language}
      </Link>
      {isAuthorized && (
        <Link to="/profile" className={style.link}>
          {lang?.profile}
        </Link>
      )}
      {!isAuthorized && (
        <Link to="/signIn" className={style.link}>
          {lang?.signIn}
        </Link>
      )}
      {!isAuthorized && (
        <Link to="/signUp" className={style.link}>
          {lang?.signUp}
        </Link>
      )}
      {isAuthorized && (
        <a className={style.link} onClick={onLogOut}>
          {lang?.logOut}
        </a>
      )}
    </header>
  );
};

export default Header;
