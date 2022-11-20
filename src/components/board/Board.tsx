import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getColumns } from 'services/api';
import { toggleAddColumnModal } from 'store/boardsSlice';
import * as selectors from 'store/selectors';
import { IColumn, useAppDispatch } from 'types/types';
import style from './Board.module.css';

export const Board = () => {
  const activeBoard = useSelector(selectors.activeBoardSelector);
  const column = useSelector(selectors.columnsSelector);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getColumns(activeBoard._id));
  });

  const renderColumn = (column: IColumn) => {
    return (
      <div className={style.column} key={column._id}>
        <div>{column.title}</div>
      </div>
    );
  };

  const openModal = () => {
    dispatch(toggleAddColumnModal(true));
  };

  return (
    <div className={style.boardContainer}>
      <h2>{activeBoard.title.split('&')[0]}</h2>
      <p>{activeBoard.title.split('&')[1]}</p>
      <button onClick={openModal}>Add column</button>
      <div className={style.boardWrapper}>{column.map(renderColumn)}</div>
    </div>
  );
};

export default Board;
