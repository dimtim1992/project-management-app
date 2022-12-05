import Button from 'components/button';
import { selectLang } from 'pages/langPage/langPage';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getBoards, getTasksBySearch } from 'services/api';
import { setActiveBoard, setBoardToBeDeleted, setDeleteToggle } from 'store/boardsSlice';
import { IBoard, ITask, useAppDispatch } from 'types/types';
import * as selectors from '../../store/selectors';
import style from './index.module.css';

const BoardsPage = () => {
  const boards = useSelector(selectors.boardsSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const langKey = useSelector(selectors.langSelector);
  const lang = selectLang(langKey);

  const [inputValue, setInputValue] = useState<string>('');
  const [searchResults, setSearchResults] = useState<ITask[]>([]);

  useEffect(() => {
    dispatch(getBoards());
  }, [dispatch]);

  const onDeleteBoardInit = (boardId: string) => {
    dispatch(setDeleteToggle(true));
    dispatch(setBoardToBeDeleted(boardId));
  };

  const renderBoard = (board: IBoard) => {
    return (
      board.title && (
        <div
          className={style.item}
          key={board._id}
          onClick={() => {
            dispatch(setActiveBoard(board._id));
            navigate(`/boards/${board._id}`);
          }}
        >
          <div className={style.board} key={board._id}>
            <div className={style.boardTitle}>{board.title.split('&')[0]}</div>
            <div className={style.boardDescription}>{board.title.split('&')[1]}</div>
            <Button
              event={(e) => {
                e.stopPropagation();
                onDeleteBoardInit(board._id);
              }}
              name={lang.boards.deleteBoardButton}
            />
          </div>
        </div>
      )
    );
  };

  const handleChange = (event: { target: { value: string } }) => {
    setInputValue(event?.target?.value);
  };

  const handleSubmit = async () => {
    setSearchResults(await getTasksBySearch(inputValue));
  };

  const searchResultsTag = searchResults.map((item: ITask) => {
    return (
      <li key={item._id}>
        <p>{item.title}</p>
        <p>{item.description}</p>
      </li>
    );
  });

  return (
    <div className={style.wrapper}>
      <form onSubmit={handleSubmit} className="form">
        <label>
          {lang.search.title}:
          <input type="text" onChange={handleChange} value={inputValue} />
        </label>
        <Button event={() => {}} name="Submit" />
      </form>
      {inputValue && <ul>{searchResultsTag}</ul>}
      <h2>{lang.boards.name}</h2>
      <div className={style.boardsWrapper}>{boards.map(renderBoard)}</div>
    </div>
  );
};

export default BoardsPage;
