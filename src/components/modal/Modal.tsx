import React, { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  setBoardToBeDeleted,
  setColumnToBeDeleted,
  setDeleteToggle,
  setTaskToBeDeleted,
  toggleAddBoardModal,
  toggleAddColumnModal,
  toggleAddTaskModal,
  toggleEditTaskModal,
} from 'store/boardsSlice';
import {
  addBoardsModalSelector,
  addColumnsModalSelector,
  addTaskModalSelector,
  deleteToggleSelector,
  editTaskModalSelector,
} from 'store/selectors';
import style from './Modal.module.css';

const modalRootElement = document.getElementById('modal');

export const Modal = (props: {
  item: React.ReactElement<React.JSXElementConstructor<React.ReactFragment>>;
}) => {
  const element = useMemo(() => document.createElement('div'), []);
  const openBoardsModal = useSelector(addBoardsModalSelector);
  const openColumnsModal = useSelector(addColumnsModalSelector);
  const openTasksModal = useSelector(addTaskModalSelector);
  const openEditTasksModal = useSelector(editTaskModalSelector);
  const deleteToggle = useSelector(deleteToggleSelector);

  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(toggleAddBoardModal(false));
    dispatch(toggleAddColumnModal(false));
    dispatch(toggleAddTaskModal(false));
    dispatch(toggleEditTaskModal(false));
    dispatch(setDeleteToggle(false));
    dispatch(setTaskToBeDeleted(null));
    dispatch(setColumnToBeDeleted(null));
    dispatch(setBoardToBeDeleted(null));
  };

  useEffect(() => {
    if (
      openBoardsModal ||
      openColumnsModal ||
      openTasksModal ||
      openEditTasksModal ||
      deleteToggle
    ) {
      modalRootElement?.appendChild(element);

      return () => {
        modalRootElement?.removeChild(element);
      };
    }
  }, [
    deleteToggle,
    element,
    openBoardsModal,
    openColumnsModal,
    openEditTasksModal,
    openTasksModal,
  ]);

  if (openBoardsModal || openColumnsModal || openTasksModal || openEditTasksModal || deleteToggle) {
    return createPortal(
      <div className={style.modalBackground} onClick={closeModal}>
        <div
          className={style.modalCard}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {props.item}
        </div>
      </div>,
      element
    );
  }

  return null;
};

export default Modal;
