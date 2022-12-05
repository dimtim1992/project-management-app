import React from 'react';
import { selectLang } from 'pages/langPage/langPage';
import { useSelector } from 'react-redux';
import { langSelector } from 'store/selectors';
import style from './index.module.css';

const HomePage = () => {
  const langKey = useSelector(langSelector);
  const lang = selectLang(langKey);

  return (
    <article className={style.wrapper}>
      <section className={style.app}>
        <p className={style.paragraph}>{lang.home.textApp}</p>
        <h2>{lang.home.titleVideo}</h2>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/pz11ftTb2Pk"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <p className={style.paragraph}>{lang.home.textCourse}</p>
      </section>
      <section className={style.team}>
        <h2>{lang.home.titleTeam}</h2>
        <ul className={style.teamList}>
          <li className={style.teamMember}>
            <a href="https://github.com/Zankorrr">
              <img
                className={style.teamMemberImage}
                src="https://avatars.githubusercontent.com/u/95276425?v=4"
                alt="alex-image"
              />
            </a>
            <h3>{lang.home.nameAlex}</h3>
          </li>
          <li className={style.teamMember}>
            <a href="https://github.com/dimtim1992">
              <img
                className={style.teamMemberImage}
                src="https://avatars.githubusercontent.com/u/36646929?v=4"
                alt="dima-image"
              />
            </a>
            <h3>{lang.home.nameDima}</h3>
          </li>
          <li className={style.teamMember}>
            <a href="https://github.com/MaxNikitenok">
              <img
                className={style.teamMemberImage}
                src="https://avatars.githubusercontent.com/u/99993317?v=4"
                alt="max-image"
              />
            </a>
            <h3>{lang.home.nameMax}</h3>
          </li>
        </ul>
      </section>
    </article>
  );
};

export default HomePage;
