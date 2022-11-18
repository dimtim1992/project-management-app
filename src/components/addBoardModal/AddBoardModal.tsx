import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import {
  addBoard,
  setNewBoardDescription,
  setNewBoardName,
  toggleAddBoardModal,
} from 'store/boardsSlice';
import * as selectors from '../../store/selectors';

const AddBoardModal = () => {
  const newBoardName = useSelector(selectors.newBoardNameSelector);
  const newBoardDescription = useSelector(selectors.newBoardDescriptionSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onAddBoard = () => {
    navigate('/boards');

    dispatch(
      addBoard({
        title: newBoardName,
        owner: newBoardDescription,
        users: ['testUsers'],
      })
    );
    dispatch(toggleAddBoardModal(false));
    dispatch(setNewBoardName(''));
    dispatch(setNewBoardDescription(''));
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
