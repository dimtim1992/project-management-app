import React from 'react';
import style from './index.module.css';
import ru from '../../lang/ru.json';
import eng from '../../lang/eng.json';
import { setLang } from 'store/usersSlice';
import { useDispatch, useSelector } from 'react-redux';
import { langSelector } from 'store/selectors';
import ruIcon from '../../assets/images/ru.png';
import enIcon from '../../assets/images/en.png';

export const selectLang = (key: string) => {
  if (key === 'ru') {
    return ru;
  } else {
    return eng;
  }
};

export function LangPage() {
  const dispatch = useDispatch();
  const currentLang = useSelector(langSelector);

  const onRu = () => {
    localStorage.setItem('langKey', 'ru');
    dispatch(setLang('ru'));
  };

  const onEng = () => {
    localStorage.setItem('langKey', 'eng');
    dispatch(setLang('eng'));
  };

  return (
    <div className={style.wrapper}>
      <h2>Language</h2>
      <label>
        Choose the language:
        <div className={style.langChoice}>
          <img src={ruIcon} alt="ru" className={style.flag} onClick={onRu} />
          <input
            type="range"
            className={style.range}
            min={1}
            max={2}
            value={currentLang === 'ru' ? 1 : 2}
            onChange={(e) => {
              e.target.value === '1' ? onRu() : onEng();
            }}
          />
          <img src={enIcon} alt="eng" className={style.flag} onClick={onEng} />
        </div>
      </label>
    </div>
  );
}
