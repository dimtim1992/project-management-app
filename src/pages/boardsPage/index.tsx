import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { deleteBoard, getBoards } from 'services/api';
import { IBoard, IColumn, useAppDispatch } from 'types/types';
import * as selectors from '../../store/selectors';
import style from './index.module.css';

const BoardsPage = () => {
  const boards = useSelector(selectors.boardsSelector);
  const columns = useSelector(selectors.columnsSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBoards());
  }, [dispatch]);

  const renderColumn = (column: IColumn, index: number) => {
    return (
      column.title && (
        <div className={style.column} key={index}>
          <div>{column.title}</div>
        </div>
      )
    );
  };

  const delBoard = (id: string) => {
    dispatch(deleteBoard(id));
    dispatch(getBoards());
  };

  const renderBoard = (board: IBoard) => {
    return (
      board.title && (
        <div className={style.board} key={board._id}>
          <div>{board.title}</div>
          <div>
            <h2>Columns</h2>
            <div className={style.columnsWrapper}>{columns.map(renderColumn)}</div>
            <button>Add Column</button>
          </div>
          <button onClick={() => delBoard(board._id)}>delete board</button>
        </div>
      )
    );
  };

  return (
    <div className={style.wrapper}>
      <h2>Boards</h2>
      <div className={style.boardsWrapper}>{boards.map(renderBoard)}</div>
    </div>
  );
};

export default BoardsPage;
