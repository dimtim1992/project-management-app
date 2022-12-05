import React, { Suspense, useEffect, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import {
  addBoardsModalSelector,
  addColumnsModalSelector,
  addTaskModalSelector,
  boardLoadingSelector,
  deleteToggleSelector,
  editTaskModalSelector,
  isAuthorizedSelector,
  userLoadingSelector,
} from 'store/selectors';
import { setLang } from 'store/usersSlice';
import EditTaskModal from 'components/EditTaskModal/EditTaskModal';

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
const SignInPage = lazy(() => import('pages/signInPage/signInPage'));
const SignUpPage = lazy(() => import('pages/signUpPage/signUpPage'));

function App() {
  const openBoardsModal = useSelector(addBoardsModalSelector);
  const openColumnsModal = useSelector(addColumnsModalSelector);
  const openTasksModal = useSelector(addTaskModalSelector);
  const openEditTaskModal = useSelector(editTaskModalSelector);
  const boardsLoading = useSelector(boardLoadingSelector);
  const userLoading = useSelector(userLoadingSelector);
  const deleteToggle = useSelector(deleteToggleSelector);
  const isAuthorized = useSelector(isAuthorizedSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLang(localStorage.getItem('langKey')));
  }, [dispatch]);

  return (
    <>
      <Suspense fallback={<div>LOADING...</div>}>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/boards" element={isAuthorized ? <BoardsPage /> : <SignInPage />} />
          <Route path="/boards/:id" element={isAuthorized ? <Board /> : <SignInPage />} />
          <Route path="/profile" element={isAuthorized ? <ProfilePage /> : <SignInPage />} />
          <Route path="/signIn" element={isAuthorized ? <BoardsPage /> : <SignInPage />} />
          <Route path="/signUp" element={isAuthorized ? <BoardsPage /> : <SignUpPage />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
        {openBoardsModal && <Modal item={<AddBoardModal />} />}
        {openColumnsModal && <Modal item={<AddColumnModal />} />}
        {openTasksModal && <Modal item={<AddTaskModal />} />}
        {openEditTaskModal && <Modal item={<EditTaskModal />} />}
        {deleteToggle && <Modal item={<DeleteModal />} />}
        {!openBoardsModal && (boardsLoading || userLoading) && <LoadingModal />}
        <Footer />
      </Suspense>
    </>
  );
}

export default App;
