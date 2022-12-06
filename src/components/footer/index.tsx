import React from 'react';
import { selectLang } from 'pages/langPage/langPage';
import { useSelector } from 'react-redux';
import { langSelector } from 'store/selectors';
import style from './index.module.css';
import RSSIcon from '../../assets/images/RSS.png';

const Footer = () => {
  const langKey = useSelector(langSelector);
  const lang = selectLang(langKey);
  return (
    <footer className={style.wrapper}>
      <p className={style.item}>© 2022</p>
      <ul className={style.list}>
        <a className={style.link} href="https://github.com/Zankorrr">
          {lang.home.nameAlex}
        </a>
        <a className={style.link} href="https://github.com/dimtim1992">
          {lang.home.nameDima}
        </a>
        <a className={style.link} href="https://github.com/MaxNikitenok">
          {lang.home.nameMax}
        </a>
      </ul>
      <a className={style.link} href="https://rs.school/react/">
        <img className={style.RSSImage} src={RSSIcon} alt="RSS" />
      </a>
    </footer>
  );
};

export default Footer;
