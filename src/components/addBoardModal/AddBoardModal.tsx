import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { createBoard, getBoards } from 'services/api';
import { setNewBoardDescription, setNewBoardName, toggleAddBoardModal } from 'store/boardsSlice';
import { useAppDispatch } from 'types/types';
import * as selectors from '../../store/selectors';

const AddBoardModal = () => {
  const newBoardName = useSelector(selectors.newBoardNameSelector);
  const newBoardDescription = useSelector(selectors.newBoardDescriptionSelector);
  const owner = localStorage.getItem('userId');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onAddBoard = () => {
    navigate('/boards');

    dispatch(
      createBoard({
        title: `${newBoardName}&${newBoardDescription}`,
        owner: owner,
        users: ['testUsers'],
      })
    );
    dispatch(toggleAddBoardModal(false));
    dispatch(setNewBoardName(''));
    dispatch(setNewBoardDescription(''));
    dispatch(getBoards());
  };

  return (
    <>
      <label>Board name</label>
      <input type="text" onChange={(e) => dispatch(setNewBoardName(e.target.value))} />

      <label>Description</label>
      <input type="text" onChange={(e) => dispatch(setNewBoardDescription(e.target.value))} />
      <br />
      <button onClick={onAddBoard}>Add Board</button>
    </>
  );
};

export default AddBoardModal;
