import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBoard } from 'store/boardsSlice';
import { IBoard } from 'types/types';
import * as selectors from '../../store/selectors';
import style from './index.module.css';

const BoardsPage = () => {
  const boards = useSelector(selectors.boardsSelector);
  const dispatch = useDispatch();

  const renderBoard = (board: IBoard, index: number) => {
    return (
      <div className={style.board} key={index}>
        <div>
          {board.owner}
          {index}
        </div>
        <div>
          {board.title}
          {index}
        </div>
      </div>
    );
  };

  const onAddBoard = () => {
    dispatch(
      addBoard({
        title: 'testTitle',
        owner: 'testOwner',
        users: ['testUsers'],
      })
    );
  };

  return (
    <div className={style.wrapper}>
      <h2>Boards</h2>
      <button onClick={onAddBoard}>add board</button>
      <div className={style.boardsWrapper}>{boards.map(renderBoard)}</div>
    </div>
  );
};

export default BoardsPage;
