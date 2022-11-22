import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getBoards, getColumns } from 'services/api';
import { cleanUserColumn, toggleAddColumnModal } from 'store/boardsSlice';
import * as selectors from 'store/selectors';
import { IColumn, useAppDispatch } from 'types/types';
import style from './Board.module.css';

export const Board = () => {
  const activeBoard = useSelector(selectors.activeBoardSelector);
  const column = useSelector(selectors.columnsSelector);
  const saveTitle = localStorage.getItem('activeBoardTitle');

  const dispatch = useAppDispatch();

  useEffect(() => {
    const saveId = () => {
      if (localStorage.getItem('activeBoardId')) {
        return localStorage.getItem('activeBoardId');
      }
      return activeBoard._id;
    };
    dispatch(getBoards);
    dispatch(getColumns(saveId()));
    return function cleanup() {
      dispatch(cleanUserColumn());
    };
  }, [activeBoard._id, dispatch]);

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
      <h2>{saveTitle ? saveTitle.split('&')[0] : activeBoard.title.split('&')[0]}</h2>
      <p>{saveTitle ? saveTitle.split('&')[1] : activeBoard.title.split('&')[1]}</p>
      <button onClick={openModal}>Add column</button>
      <div className={style.boardWrapper}>{column.map(renderColumn)}</div>
    </div>
  );
};

export default Board;
