import { selectLang } from 'pages/langPage/langPage';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getBoards, getBoardsSearch, getTasksSetSearch } from 'services/api';
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
  const [isSearched, setIsSearched] = useState<boolean>(false);

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
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteBoardInit(board._id);
              }}
            >
              {lang.boards.deleteBoardButton}
            </button>
          </div>
        </div>
      )
    );
  };

  const handleChange = (event: { target: { value: string } }) => {
    setInputValue(event?.target?.value);
  };

  const handleSubmit = async () => {
    event?.preventDefault();
    const boards = await getBoardsSearch();
    const arrPromises = boards.map((item: IBoard) => getTasksSetSearch(item._id));
    const tasks = (await Promise.all(arrPromises)).flat();
    const result = tasks.filter((item: ITask) => {
      return item.title.includes(inputValue) || item.description.includes(inputValue);
    });

    inputValue.length ? setIsSearched(true) : setIsSearched(false);

    setSearchResults(result);
  };

  const searchResultsTag = searchResults.map((item: ITask) => {
    return (
      <li key={item._id} className={style.searchListItem}>
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
        <button>{lang.search.name}</button>
      </form>
      {isSearched && <ul className={style.searchList}>{searchResultsTag}</ul>}
      {!isSearched && (
        <>
          <h2>{lang.boards.name}</h2>
          <div className={style.boardsWrapper}>{boards.map(renderBoard)}</div>
        </>
      )}
    </div>
  );
};

export default BoardsPage;
