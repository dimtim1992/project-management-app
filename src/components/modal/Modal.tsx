import React, { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleAddBoardModal, toggleAddColumnModal } from 'store/boardsSlice';
import { addBoardsModalSelector, addColumnsModalSelector } from 'store/selectors';
import style from './Modal.module.css';

const modalRootElement = document.getElementById('modal');

export const Modal = (props: {
  item: React.ReactElement<React.JSXElementConstructor<React.ReactFragment>>;
}) => {
  const element = useMemo(() => document.createElement('div'), []);
  const openBoardsModal = useSelector(addBoardsModalSelector);
  const openColumnsModal = useSelector(addColumnsModalSelector);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(toggleAddBoardModal(false));
    dispatch(toggleAddColumnModal(false));
  };

  useEffect(() => {
    if (openBoardsModal || openColumnsModal) {
      modalRootElement?.appendChild(element);

      return () => {
        modalRootElement?.removeChild(element);
      };
    }
  }, [element, openBoardsModal, openColumnsModal]);

  if (openBoardsModal || openColumnsModal) {
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
