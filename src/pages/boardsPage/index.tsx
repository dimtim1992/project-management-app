import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteBoard, getBoards } from 'services/api';
import { setActiveBoard } from 'store/boardsSlice';
import { IBoard, useAppDispatch } from 'types/types';
import * as selectors from '../../store/selectors';
import style from './index.module.css';

const BoardsPage = () => {
  const boards = useSelector(selectors.boardsSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
        <div
          className={style.item}
          key={board._id}
          onClick={() => {
            dispatch(setActiveBoard(board._id));
            navigate(`/boards/${board._id}`);
          }}
        >
          <div className={style.board} key={board._id}>
            <div className={style.boardTitle}>{board.title.split('&')[0]}</div>
            <div className={style.boardDescription}>{board.title.split('&')[1]}</div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                delBoard(board._id);
              }}
            >
              delete board
            </button>
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
