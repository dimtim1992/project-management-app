import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBoard } from 'store/boardsSlice';
import { State, IBoard } from 'types/types';
import style from './BoardsPage.module.css';

export function BoardsPage() {
  const boards = useSelector((state: State) => state.boards.userBoards);
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

  const addBoard = () => {
    dispatch(
      setBoard({
        title: 'testTitle',
        owner: 'testOwner',
        users: ['testUsers'],
      })
    );
  };

  return (
    <div className={style.boardsContainer}>
      <h2>Boards</h2>
      <button onClick={addBoard}>add board</button>
      <div className={style.boardsWrapper}>{boards.map(renderBoard)}</div>
    </div>
  );
}
