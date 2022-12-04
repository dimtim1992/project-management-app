import React from 'react';
import style from './index.module.css';

const NotFoundPage = () => {
  return (
    <div className={style.wrapper}>
      <h2>ERROR 404!</h2>
      <p>Sorry, page is not found.</p>
    </div>
  );
};

export default NotFoundPage;
