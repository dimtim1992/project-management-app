import React, { Suspense, useEffect, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
<<<<<<< HEAD
=======
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
>>>>>>> d7596bd (feat: add validation to sign in form)
import { useDispatch, useSelector } from 'react-redux';
import {
  addBoardsModalSelector,
  addColumnsModalSelector,
  addTaskModalSelector,
  boardLoadingSelector,
  deleteToggleSelector,
  userLoadingSelector,
} from 'store/selectors';
import { setLang } from 'store/usersSlice';
const Header = lazy(() => import('components/header'));
const Footer = lazy(() => import('components/footer'));
const Modal = lazy(() => import('components/modal/Modal'));
const AddBoardModal = lazy(() => import('components/addBoardModal/AddBoardModal'));
const Board = lazy(() => import('components/board/Board'));
const AddColumnModal = lazy(() => import('components/addColumnModal/AddColumnModal'));
const AddTaskModal = lazy(() => import('components/addTaskModal/AddTaskModal'));
const LoadingModal = lazy(() => import('components/LoadingModal/LoadingModal'));
const DeleteModal = lazy(() => import('components/DeleteModal/DeleteModal'));
const NotFoundPage = lazy(() => import('pages/notFoundPage'));
const HomePage = lazy(() => import('pages/homePage'));
const BoardsPage = lazy(() => import('pages/boardsPage'));
const ProfilePage = lazy(() => import('pages/profilePage'));
const SearchPage = lazy(() => import('pages/searchPage/searchPage'));
const LangPage = lazy(() => import('pages/langPage/langPage'));
const SignInPage = lazy(() => import('pages/signInPage/signInPage'));
const SignUpPage = lazy(() => import('pages/signUpPage/signUpPage'));

function App() {
  const openBoardsModal = useSelector(addBoardsModalSelector);
  const openColumnsModal = useSelector(addColumnsModalSelector);
  const openTasksModal = useSelector(addTaskModalSelector);
  const boardsLoading = useSelector(boardLoadingSelector);
  const userLoading = useSelector(userLoadingSelector);
  const deleteToggle = useSelector(deleteToggleSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLang(localStorage.getItem('langKey')));
  }, [dispatch]);

  return (
    <>
<<<<<<< HEAD
      <Suspense fallback={<div>LOADING...</div>}>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/boards" element={<BoardsPage />} />
          <Route path="/boards/:id" element={<Board />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/lang" element={<LangPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/signIn" element={<SignInPage />} />
          <Route path="/signUp" element={<SignUpPage />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
        {openBoardsModal && <Modal item={<AddBoardModal />} />}
        {openColumnsModal && <Modal item={<AddColumnModal />} />}
        {openTasksModal && <Modal item={<AddTaskModal />} />}
        {deleteToggle && <Modal item={<DeleteModal />} />}
        {!openBoardsModal && (boardsLoading || userLoading) && <LoadingModal />}
        <Footer />
      </Suspense>
=======
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
>>>>>>> d7596bd (feat: add validation to sign in form)
    </>
  );
}

export default App;
