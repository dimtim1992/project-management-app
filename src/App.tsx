import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from 'components/header';
import Footer from 'components/footer';
import HomePage from 'pages/homePage';
import BoardsPage from 'pages/boardsPage';
import ProfilePage from 'pages/profilePage';
// import { AddPage } from './pages/addPage/addPage';
import { SearchPage } from './pages/searchPage/searchPage';
import { LangPage } from './pages/langPage/langPage';
import { SignInPage } from './pages/signInPage/signInPage';
import { SignUpPage } from './pages/signUpPage/signUpPage';
import Modal from 'components/modal/Modal';
import AddBoardModal from 'components/addBoardModal/AddBoardModal';
import { useDispatch, useSelector } from 'react-redux';
import {
  addBoardsModalSelector,
  addColumnsModalSelector,
  addTaskModalSelector,
} from 'store/selectors';
import Board from 'components/board/Board';
import AddColumnModal from 'components/addColumnModal/AddColumnModal';
import { setLang } from 'store/usersSlice';
import AddTaskModal from 'components/AddTaskModal/AddTaskModal';

function App() {
  const openBoardsModal = useSelector(addBoardsModalSelector);
  const openColumnsModal = useSelector(addColumnsModalSelector);
  const openTasksModal = useSelector(addTaskModalSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLang(localStorage.getItem('langKey')));
  });

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/boards" element={<BoardsPage />} />
        <Route path="/boards/:id" element={<Board />} />
        {/* <Route path="/add" element={<AddPage />} /> */}
        <Route path="/search" element={<SearchPage />} />
        <Route path="/lang" element={<LangPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/signIn" element={<SignInPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
      </Routes>
      {openBoardsModal && <Modal item={<AddBoardModal />} />}
      {openColumnsModal && <Modal item={<AddColumnModal />} />}
      {openTasksModal && <Modal item={<AddTaskModal />} />}
      <Footer />
    </>
  );
}

export default App;
