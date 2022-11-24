import React from 'react';
import { useSelector } from 'react-redux';
import { createColumn } from 'services/api';
import { setNewColumnTitle, toggleAddColumnModal } from 'store/boardsSlice';
import { useAppDispatch } from 'types/types';
import * as selectors from '../../store/selectors';
import style from './AddColumnModal.module.css';

const AddColumnModal = () => {
  const newColumnTitle = useSelector(selectors.newColumnTitleSelector);
  const boardId = localStorage.getItem('activeBoardId');
  const dispatch = useAppDispatch();

  const onAddColumn = () => {
    dispatch(
      createColumn({
        title: newColumnTitle,
        order: 1,
        boardId: boardId,
      })
    );
    dispatch(toggleAddColumnModal(false));
    dispatch(setNewColumnTitle(''));
  };

  return (
    <div className={style.columnModal}>
      <label>Column name</label>
      <input
        type="text"
        onChange={(e) => {
          dispatch(setNewColumnTitle(e.target.value));
        }}
      />

      <br />
      <button onClick={onAddColumn}>Add Column</button>
    </div>
  );
};

export default AddColumnModal;
