import { selectLang } from 'pages/langPage/langPage';
import React from 'react';
import { useSelector } from 'react-redux';
import { putTask } from 'services/api';
import {
  setEditTask,
  setEditTaskDescription,
  setEditTaskTitle,
  toggleEditTaskModal,
} from 'store/boardsSlice';
import { ITask, useAppDispatch } from 'types/types';
import * as selectors from '../../store/selectors';
import style from './EditTaskModal.module.css';

export const AddTaskModal = () => {
  const task = useSelector(selectors.editTaskSelector);
  const taskTitle = useSelector(selectors.editTaskSelector).title;
  const taskDescription = useSelector(selectors.editTaskSelector).description;
  const langKey = useSelector(selectors.langSelector);
  const lang = selectLang(langKey);
  const dispatch = useAppDispatch();

  const onEditTask = () => {
    dispatch(putTask(task));
    dispatch(toggleEditTaskModal(false));
    dispatch(setEditTask({} as ITask));
  };

  return (
    <div className={style.taskModal}>
      <div className={style.cross} onClick={() => dispatch(toggleEditTaskModal(false))}>
        ×
      </div>
      <label>{lang.editTasksModal.taskTitle}</label>
      <input
        type="text"
        onChange={(e) => {
          dispatch(setEditTaskTitle(e.target.value));
        }}
        defaultValue={taskTitle}
      />
      <label>{lang.editTasksModal.taskDescription}</label>
      <input
        type="text"
        required
        onChange={(e) => {
          dispatch(setEditTaskDescription(e.target.value));
        }}
        defaultValue={taskDescription}
      />
      <br />
      <button onClick={onEditTask}>{lang.editTasksModal.aditTaskButton}</button>
    </div>
  );
};

export default AddTaskModal;
