import Modal from 'components/modal/Modal';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBoard, toggleAddBoardModal } from 'store/boardsSlice';
import { IBoard, IColumn } from 'types/types';
import * as selectors from '../../store/selectors';
import style from './index.module.css';

const BoardsPage = () => {
  const boards = useSelector(selectors.boardsSelector);
  const columns = useSelector(selectors.columnsSelector);
  const dispatch = useDispatch();
  const [boardName, setBoardName] = useState('');
  const [boardDescription, setBoardDescription] = useState('');

  const onAddBoard = () => {
    dispatch(
      addBoard({
        title: boardName,
        owner: boardDescription,
        users: ['testUsers'],
      })
    );
    dispatch(toggleAddBoardModal(false));
  };

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
      <Modal
        item={
          <>
            <label>Board name</label>
            <input type="text" onChange={(e) => setBoardName(e.target.value)} />

            <label>Description</label>
            <input type="text" onChange={(e) => setBoardDescription(e.target.value)} />
            <br />
            <button onClick={onAddBoard}>Add Board</button>
          </>
        }
      />
    </div>
  );
};

export default BoardsPage;
