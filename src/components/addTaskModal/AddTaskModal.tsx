import { selectLang } from 'pages/langPage/langPage';
import React from 'react';
import { useSelector } from 'react-redux';
import { createTask } from 'services/api';
import { setNewTaskDescription, setNewTaskTitle, toggleAddTaskModal } from 'store/boardsSlice';
import { useAppDispatch } from 'types/types';
import * as selectors from '../../store/selectors';
import style from './AddTaskModal.module.css';

export const AddTaskModal = () => {
  const columnId = localStorage.getItem('activeColumn');
  const taskTitle = useSelector(selectors.newTaskTitleSelector);
  const taskDescription = useSelector(selectors.newTaskDescriptionSelector);
  const langKey = useSelector(selectors.langSelector);
  const lang = selectLang(langKey);
  const dispatch = useAppDispatch();
  const tasks = useSelector(selectors.tasksSelector);

  const onAddTask = () => {
    console.log({
      boardId: localStorage.getItem('activeBoardId'),
      columnId: columnId,
      title: taskTitle,
      order: tasks.length,
      description: taskDescription,
      userId: 2,
      users: 'test users',
    });
    dispatch(
      createTask({
        boardId: localStorage.getItem('activeBoardId'),
        columnId: columnId,
        title: taskTitle,
        order: 3,
        description: taskDescription,
        userId: 2,
        users: 'test users',
      })
    );
    dispatch(toggleAddTaskModal(false));
    dispatch(setNewTaskTitle(''));
    dispatch(setNewTaskDescription(' '));
  };

  return (
    <div className={style.taskModal}>
      <div className={style.cross} onClick={() => dispatch(toggleAddTaskModal(false))}>
        ×
      </div>
      <label>{lang.addTasksModal.taskTitle}</label>
      <input
        type="text"
        onChange={(e) => {
          dispatch(setNewTaskTitle(e.target.value));
        }}
      />
      <label>{lang.addTasksModal.taskDescription}</label>
      <input
        type="text"
        required
        onChange={(e) => {
          dispatch(setNewTaskDescription(e.target.value));
        }}
      />
      <br />
      <button onClick={onAddTask}>{lang.addTasksModal.addTaskButton}</button>
    </div>
  );
};

export default AddTaskModal;
