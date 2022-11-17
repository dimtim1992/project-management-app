import React, { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleAddBoardModal } from 'store/boardsSlice';
import { addBoardsModalSelector } from 'store/selectors';
import style from './Modal.module.css';

const modalRootElement = document.getElementById('modal');

export const Modal = (props: {
  item: React.ReactElement<React.JSXElementConstructor<React.ReactFragment>>;
}) => {
  const element = useMemo(() => document.createElement('div'), []);
  const openModal = useSelector(addBoardsModalSelector);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(toggleAddBoardModal(false));
  };

  useEffect(() => {
    if (openModal) {
      modalRootElement?.appendChild(element);

      return () => {
        modalRootElement?.removeChild(element);
      };
    }
  }, [element, openModal]);

  if (openModal) {
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
