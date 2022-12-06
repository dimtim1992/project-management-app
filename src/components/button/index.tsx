import React from 'react';
import style from './index.module.css';

const Button = (props: {
  event: React.MouseEventHandler<HTMLButtonElement> | undefined;
  name: string | undefined;
}) => {
  return (
    <button className={style.wrapper} onClick={props.event}>
      {props.name}
    </button>
  );
};

export default Button;
