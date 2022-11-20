import React from 'react';
import { useSelector } from 'react-redux';
import * as selectors from 'store/selectors';
import { IColumn } from 'types/types';
import style from './Board.module.css';

export const Board = () => {
  const activeBoard = useSelector(selectors.activeBoardSelector);
  const column = useSelector(selectors.columnsSelector);

  const renderColumn = (column: IColumn) => {
    return (
      <div className={style.column} key={column._id}>
        <div>{column.title}</div>
      </div>
    );
  };

  return (
    <>
      <div className={style.boardContainer}>
        <h2>{activeBoard.title.split('&')[0]}</h2>
        <p>{activeBoard.title.split('&')[1]}</p>
        <button>Add column</button>
        <div className={style.boardWrapper}>{column.map(renderColumn)}</div>
      </div>
    </>
  );
};

export default Board;
