import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { createBoard, getBoards } from 'services/api';
import { setNewBoardDescription, setNewBoardTitle, toggleAddBoardModal } from 'store/boardsSlice';
import { useAppDispatch } from 'types/types';
import * as selectors from '../../store/selectors';
import style from './AddBoardModal.module.css';

const AddBoardModal = () => {
  const newBoardTitle = useSelector(selectors.newBoardTitleSelector);
  const newBoardDescription = useSelector(selectors.newBoardDescriptionSelector);
  const owner = localStorage.getItem('userId');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onAddBoard = () => {
    navigate('/boards');

    dispatch(
      createBoard({
        title: `${newBoardTitle}&${newBoardDescription}`,
        owner: owner,
        users: ['testUsers'],
      })
    );
    dispatch(toggleAddBoardModal(false));
    dispatch(setNewBoardTitle(''));
    dispatch(setNewBoardDescription(''));
  };

  useEffect(() => {
    dispatch(getBoards());
  });

  return (
    <div className={style.boardModal}>
      <label>Board name</label>
      <input type="text" onChange={(e) => dispatch(setNewBoardTitle(e.target.value))} />

      <label>Description</label>
      <input type="text" onChange={(e) => dispatch(setNewBoardDescription(e.target.value))} />
      <br />
      <button onClick={onAddBoard}>Add Board</button>
    </div>
  );
};

export default AddBoardModal;
