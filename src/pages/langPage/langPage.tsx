import React from 'react';
import './langPage.css';
import ru from '../../lang/ru.json';
import eng from '../../lang/eng.json';
import { setLang } from 'store/usersSlice';
import { useDispatch } from 'react-redux';

export const langChange = (key: string | null = 'eng', info: string) => {
  if (key === 'ru' && info === 'header') {
    return ru.header;
  } else {
    return eng.header;
  }
};

export function LangPage() {
  const dispatch = useDispatch();

  const onRu = () => {
    localStorage.setItem('langKey', 'ru');
    dispatch(setLang('ru'));
  };

  const onEng = () => {
    localStorage.setItem('langKey', 'eng');
    dispatch(setLang('eng'));
  };

  return (
    <div className="lang-container">
      <h2>Language</h2>
      <p>Choose the language</p>
      <button onClick={onRu}>Ru</button>
      <button onClick={onEng}>Eng</button>
    </div>
  );
}
