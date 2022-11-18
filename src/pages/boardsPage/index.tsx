import React from 'react';
import { useSelector } from 'react-redux';
import { IBoard, IColumn } from 'types/types';
import * as selectors from '../../store/selectors';
import style from './index.module.css';

const BoardsPage = () => {
  const boards = useSelector(selectors.boardsSelector);
  const columns = useSelector(selectors.columnsSelector);

  const renderColumn = (column: IColumn, index: number) => {
    return (
      column.title && (
        <div className={style.column} key={index}>
          <div>{column.title}</div>
        </div>
      )
    );
  };

  const renderBoard = (board: IBoard, index: number) => {
    return (
      board.title && (
        <div className={style.board} key={index}>
          <div>{board.title}</div>
          <div>{board.owner}</div>
          <div>
            <h2>Columns</h2>
            <div className={style.columnsWrapper}>{columns.map(renderColumn)}</div>
            <button>Add Column</button>
          </div>
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
