import { selectLang } from 'pages/langPage/langPage';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getBoards, getColumns, getTasksSet } from 'services/api';
import {
  cleanUserColumn,
  setColumnToBeDeleted,
  setDeleteToggle,
  setTaskToBeDeleted,
  toggleAddColumnModal,
  toggleAddTaskModal,
} from 'store/boardsSlice';
import * as selectors from 'store/selectors';
import { IColumn, ITask, useAppDispatch } from 'types/types';
import style from './Board.module.css';

export const Board = () => {
  const activeBoard = useSelector(selectors.activeBoardSelector);
  const columns = useSelector(selectors.columnsSelector);
  const tasks = useSelector(selectors.tasksSelector);
  const saveTitle = localStorage.getItem('activeBoardTitle');
  const langKey = useSelector(selectors.langSelector);
  const lang = selectLang(langKey);

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
    dispatch(getTasksSet(saveId()));

    return function cleanup() {
      dispatch(cleanUserColumn());
    };
  }, [activeBoard._id, dispatch]);

  const onDeleteTaskInit = (columnId: string, taskId: string) => {
    dispatch(setDeleteToggle(true));
    dispatch(
      setTaskToBeDeleted({
        boardId: activeBoard._id,
        columnId: columnId,
        taskId: taskId,
      })
    );
  };

  const RenderColumn = (column: IColumn) => {
    const RenderTask = (task: ITask) => {
      if (task.columnId === column._id) {
        return (
          <div className={style.task} key={task._id}>
            <div>{task.title}</div>
            <div>{task.description}</div>
            <button onClick={() => onDeleteTaskInit(column._id, task._id)}>
              {lang.board.deleteTaskButton}
            </button>
          </div>
        );
      }
    };

    const onDeleteColumnInit = (columnId: string) => {
      dispatch(setDeleteToggle(true));
      dispatch(
        setColumnToBeDeleted({
          boardId: activeBoard._id,
          columnId: columnId,
        })
      );
    };

    const openTaskModal = (id: string) => {
      dispatch(toggleAddTaskModal(true));
      localStorage.setItem('activeColumn', id);
    };

    return (
      <div className={style.column} key={column._id}>
        <div>{column.title}</div>
        <button onClick={() => openTaskModal(column._id)}>{lang.board.addTaskButton}</button>
        <div className={style.taskWrapper}>{tasks.map(RenderTask)}</div>
        <button
          onClick={() => {
            onDeleteColumnInit(column._id);
          }}
        >
          {lang.board.deleteColumnButton}
        </button>
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
      <button onClick={openModal}>{lang.board.addColumnButton}</button>
      <div className={style.boardWrapper}>{columns.map(RenderColumn)}</div>
    </div>
  );
};

export default Board;
