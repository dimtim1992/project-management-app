import { selectLang } from 'pages/langPage/langPage';
import React from 'react';
import { useSelector } from 'react-redux';
import { langSelector } from 'store/selectors';
import './searchPage.css';

export function SearchPage() {
  const langKey = useSelector(langSelector);
  const lang = selectLang(langKey);
  return (
    <div className="search-container">
      <h2>{lang.search.name}</h2>
      <p>{lang.search.title}</p>
    </div>
  );
}
