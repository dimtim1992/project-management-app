import { selectLang } from 'pages/langPage/langPage';
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
  const langKey = useSelector(selectors.langSelector);
  const lang = selectLang(langKey);

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
  }, [dispatch]);

  return (
    <div className={style.boardModal}>
      <label>{lang.addBoardsModal.boardTitle}</label>
      <input type="text" onChange={(e) => dispatch(setNewBoardTitle(e.target.value))} />

      <label>{lang.addBoardsModal.boardDescription}</label>
      <input type="text" onChange={(e) => dispatch(setNewBoardDescription(e.target.value))} />
      <br />
      <button onClick={onAddBoard}>{lang.addBoardsModal.button}</button>
    </div>
  );
};

export default AddBoardModal;
