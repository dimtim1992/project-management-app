import React, { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  setDeleteToggle,
  toggleAddBoardModal,
  toggleAddColumnModal,
  toggleAddTaskModal,
} from 'store/boardsSlice';
import {
  addBoardsModalSelector,
  addColumnsModalSelector,
  addTaskModalSelector,
  deleteToggleSelector,
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
  const deleteToggle = useSelector(deleteToggleSelector);

  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(toggleAddBoardModal(false));
    dispatch(toggleAddColumnModal(false));
    dispatch(toggleAddTaskModal(false));
    dispatch(setDeleteToggle(false));
  };

  useEffect(() => {
    if (openBoardsModal || openColumnsModal || openTasksModal || deleteToggle) {
      modalRootElement?.appendChild(element);

      return () => {
        modalRootElement?.removeChild(element);
      };
    }
  }, [deleteToggle, element, openBoardsModal, openColumnsModal, openTasksModal]);

  if (openBoardsModal || openColumnsModal || openTasksModal || deleteToggle) {
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
