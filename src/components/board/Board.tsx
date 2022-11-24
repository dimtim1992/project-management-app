import { selectLang } from 'pages/langPage/langPage';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { createTask, deleteColumn, getBoards, getColumns, getTasksSet } from 'services/api';
import { cleanUserColumn, toggleAddColumnModal } from 'store/boardsSlice';
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

  const onAddTask = (columnId: string) => {
    dispatch(
      createTask({
        boardId: localStorage.getItem('activeBoardId'),
        columnId: columnId,
        title: 'TEST',
        order: 3,
        description: 'test description',
        userId: 2,
        users: 'test users',
      })
    );
  };

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

  const RenderColumn = (column: IColumn) => {
    const RenderTask = (task: ITask) => {
      if (task.columnId === column._id) {
        return (
          <div className={style.task} key={task._id}>
            <div>{task.title}</div>
            {/* <button>Delete task</button> */}
          </div>
        );
      }
    };

    return (
      <div className={style.column} key={column._id}>
        <div>{column.title}</div>
        <button onClick={() => onAddTask(column._id)}>{lang.board.addTaskButton}</button>
        <div className={style.taskWrapper}>{tasks.map(RenderTask)}</div>
        <button
          onClick={() => {
            dispatch(deleteColumn({ boardId: activeBoard._id, columnId: column._id }));
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
