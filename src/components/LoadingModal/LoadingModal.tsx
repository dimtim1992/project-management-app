import React from 'react';
import style from './LoadingModal.module.css';
import homer from '../../assets/images/homer.gif';

export const LoadingModal = () => {
  return (
    <div className={style.modal}>
      <img src={homer} alt="homer" className={style.homer} />
    </div>
  );
};

export default LoadingModal;
