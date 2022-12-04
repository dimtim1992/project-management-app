import React from 'react';
import style from './index.module.css';
import RSSIcon from '../../assets/images/RSS.png';

const Footer = () => {
  return (
    <footer className={style.wrapper}>
      <p className={style.item}>© 2022</p>
      <ul className={style.list}>
        <a className={style.link} href="https://github.com/Zankorrr">
          Zankorrr
        </a>
        <a className={style.link} href="https://github.com/dimtim1992">
          dimtim1992
        </a>
        <a className={style.link} href="https://github.com/MaxNikitenok">
          MaxNikitenok
        </a>
      </ul>
      <a className={style.link} href="https://rs.school/react/">
        <img className={style.RSSImage} src={RSSIcon} alt="RSS" />
      </a>
    </footer>
  );
};

export default Footer;
