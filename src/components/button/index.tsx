import React from 'react';
import style from './index.module.css';

const Button = (props: {
  event: React.MouseEventHandler<HTMLDivElement> | undefined;
  name: string | undefined;
}) => {
  return (
    <div className={style.wrapper} onClick={props.event}>
      {props.name}
    </div>
  );
};

export default Button;
