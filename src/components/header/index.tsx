import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toggleAddBoardModal } from 'store/boardsSlice';
import { isAuthorizedSelector, langSelector } from 'store/selectors';
import { logOut } from 'store/usersSlice';
import style from './index.module.css';
import { selectLang } from 'pages/langPage/langPage';
import { LangChoice } from 'components/LangChoise/LangChoise';

const Header = () => {
  const langKey = useSelector(langSelector);
  const isAuthorized = useSelector(isAuthorizedSelector);
  const lang = selectLang(langKey);

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
        {lang.header.home}
      </Link>
      {isAuthorized && (
        <Link to="/boards" className={style.link}>
          {lang.header.boards}
        </Link>
      )}
      {isAuthorized && (
        <a className={style.link} onClick={openModal}>
          {lang.header.addBoard}
        </a>
      )}
      {isAuthorized && (
        <Link to="/search" className={style.link}>
          {lang.header.search}
        </Link>
      )}
      <a className={style.link}>
        <LangChoice />
      </a>
      {isAuthorized && (
        <Link to="/profile" className={style.link}>
          {lang.header.profile}
        </Link>
      )}
      {!isAuthorized && (
        <Link to="/signIn" className={style.link}>
          {lang.header.signIn}
        </Link>
      )}
      {!isAuthorized && (
        <Link to="/signUp" className={style.link}>
          {lang.header.signUp}
        </Link>
      )}
      {isAuthorized && (
        <a className={style.link} onClick={onLogOut}>
          {lang.header.logOut}
        </a>
      )}
    </header>
  );
};

export default Header;
