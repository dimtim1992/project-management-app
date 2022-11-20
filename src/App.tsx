import React from 'react';
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
import { useSelector } from 'react-redux';
import { addBoardsModalSelector } from 'store/selectors';
import Board from 'components/board/Board';

function App() {
  const openModal = useSelector(addBoardsModalSelector);

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
      {openModal && <Modal item={<AddBoardModal />} />}
      <Footer />
    </>
  );
}

export default App;
