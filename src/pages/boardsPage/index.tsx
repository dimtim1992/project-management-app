import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteBoard, getBoards } from 'services/api';
import { setActiveBoard } from 'store/boardsSlice';
import { IBoard, useAppDispatch } from 'types/types';
import * as selectors from '../../store/selectors';
import style from './index.module.css';

const BoardsPage = () => {
  const boards = useSelector(selectors.boardsSelector);
  // const columns = useSelector(selectors.columnsSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBoards());
  }, [dispatch]);

  const delBoard = (id: string) => {
    dispatch(deleteBoard(id));
    dispatch(getBoards());
  };

  const renderBoard = (board: IBoard) => {
    return (
      board.title && (
        <Link
          to={`/boards/${board._id}`}
          className={style.item}
          key={board._id}
          onClick={() => {
            dispatch(setActiveBoard(board._id));
          }}
        >
          <div className={style.board} key={board._id}>
            <div className={style.boardTitle}>{board.title.split('&')[0]}</div>
            <div className={style.boardDescription}>{board.title.split('&')[1]}</div>
            <button onClick={() => delBoard(board._id)}>delete board</button>
          </div>
        </Link>
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
