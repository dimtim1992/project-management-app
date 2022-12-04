import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from 'components/header';
import Footer from 'components/footer';
import HomePage from 'pages/homePage';
import BoardsPage from 'pages/boardsPage';
import ProfilePage from 'pages/profilePage';
// import { SearchPage } from './pages/searchPage/searchPage';
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
  deleteToggleSelector,
  loadingSelector,
} from 'store/selectors';
import Board from 'components/board/Board';
import AddColumnModal from 'components/addColumnModal/AddColumnModal';
import { setLang } from 'store/usersSlice';
import AddTaskModal from 'components/addTaskModal/AddTaskModal';
import LoadingModal from 'components/LoadingModal/LoadingModal';
import DeleteModal from 'components/DeleteModal/DeleteModal';

function App() {
  const openBoardsModal = useSelector(addBoardsModalSelector);
  const openColumnsModal = useSelector(addColumnsModalSelector);
  const openTasksModal = useSelector(addTaskModalSelector);
  const loading = useSelector(loadingSelector);
  const deleteToggle = useSelector(deleteToggleSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLang(localStorage.getItem('langKey')));
  }, [dispatch]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/boards" element={<BoardsPage />} />
        <Route path="/boards/:id" element={<Board />} />
        {/* <Route path="/search" element={<SearchPage />} /> */}
        <Route path="/lang" element={<LangPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/signIn" element={<SignInPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
      </Routes>
      {openBoardsModal && <Modal item={<AddBoardModal />} />}
      {openColumnsModal && <Modal item={<AddColumnModal />} />}
      {openTasksModal && <Modal item={<AddTaskModal />} />}
      {deleteToggle && <Modal item={<DeleteModal />} />}
      {!openBoardsModal && loading && <LoadingModal />}
      <Footer />
    </>
  );
}

export default App;
