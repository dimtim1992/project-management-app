import React from 'react';
import { useSelector } from 'react-redux';
import { deleteBoard, deleteColumn, deleteTask, getBoards } from 'services/api';
import {
  setBoardToBeDeleted,
  setColumnToBeDeleted,
  setDeleteToggle,
  setSearchResults,
  setTaskToBeDeleted,
} from 'store/boardsSlice';
import {
  boardToBeDeletedSelector,
  columnToBeDeletedSelector,
  searchResultsSelector,
  taskToBeDeletedSelector,
} from 'store/selectors';
import { useAppDispatch } from 'types/types';
import style from './DeleteModal.module.css';

export const DeleteModal = () => {
  const dispatch = useAppDispatch();
  const taskToBeDeleted = useSelector(taskToBeDeletedSelector);
  const columnToBeDeleted = useSelector(columnToBeDeletedSelector);
  const boardToBeDeleted = useSelector(boardToBeDeletedSelector);
  const searchResults = useSelector(searchResultsSelector);

  const onDeleteItem = () => {
    if (taskToBeDeleted) {
      dispatch(deleteTask(taskToBeDeleted));
      dispatch(setTaskToBeDeleted(null));
      dispatch(
        setSearchResults(searchResults.filter((item) => item._id !== taskToBeDeleted.taskId))
      );
    }
    if (columnToBeDeleted) {
      dispatch(deleteColumn(columnToBeDeleted));
      dispatch(setColumnToBeDeleted(null));
    }
    if (boardToBeDeleted) {
      dispatch(deleteBoard(boardToBeDeleted));
      dispatch(setBoardToBeDeleted(null));
      dispatch(getBoards());
    }
    dispatch(setDeleteToggle(false));
  };

  const onCancel = () => {
    dispatch(setDeleteToggle(false));
    dispatch(setTaskToBeDeleted(null));
    dispatch(setColumnToBeDeleted(null));
    dispatch(setBoardToBeDeleted(null));
  };

  return (
    <div className={style.deleteModal}>
      <div className={style.cross} onClick={() => dispatch(setDeleteToggle(false))}>
        ×
      </div>
      {taskToBeDeleted && <span>Are you sure you want to delete the TASK?</span>}
      {columnToBeDeleted && <span>Are you sure you want to delete the COLUMN?</span>}
      {boardToBeDeleted && <span>Are you sure you want to delete the BOARD?</span>}
      <br />
      <button onClick={onDeleteItem}>Ok</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default DeleteModal;
