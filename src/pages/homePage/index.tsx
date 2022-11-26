import { selectLang } from 'pages/langPage/langPage';
import React from 'react';
import { useSelector } from 'react-redux';
import { langSelector } from 'store/selectors';
import style from './index.module.css';

const HomePage = () => {
  const langKey = useSelector(langSelector);
  const lang = selectLang(langKey);

  return (
    <div className={style.wrapper}>
      <h2>{lang.home.name}</h2>
      <p>{lang.home.title}</p>
      <p>{lang.home.text}</p>
      <p>{lang.home.text}</p>
      <p>{lang.home.text}</p>
      <p>{lang.home.text}</p>
      <p>{lang.home.text}</p>
      <p>{lang.home.text}</p>
    </div>
  );
};

export default HomePage;
