import React from 'react';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import { HomePage } from './pages/homePage/homePage';
import { BoardsPage } from 'pages/BoardsPage/BoardsPage';
import { AddPage } from './pages/addPage/addPage';
import { SearchPage } from './pages/searchPage/searchPage';
import { LangPage } from './pages/langPage/langPage';
import { ProfilePage } from './pages/profilePage/profilePage';
import { SignInPage } from './pages/signInPage/signInPage';
import { SignUpPage } from './pages/signUpPage/signUpPage';

function App() {
  return (
    <>
      <header className="app-header">
        <Link to="/" className="app-header-item">
          Home
        </Link>
        <Link to="/boards" className="app-header-item">
          Boards
        </Link>
        <Link to="/add" className="app-header-item">
          Add board
        </Link>
        <Link to="/search" className="app-header-item">
          Search
        </Link>
        <Link to="/lang" className="app-header-item">
          Language
        </Link>
        <Link to="/profile" className="app-header-item">
          Profile
        </Link>
        <Link to="/signIn" className="app-header-item">
          Sign in
        </Link>
        <Link to="/signUp" className="app-header-item">
          Sign up
        </Link>
      </header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/boards" element={<BoardsPage />} />
        <Route path="/add" element={<AddPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/lang" element={<LangPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/signIn" element={<SignInPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
      </Routes>
      <footer className="app-footer">
        <p className="app-footer-item">© 2022</p>
        <ul className="app-footer-item app-footer-list-creators">
          <a className="app-footer-item" href="https://github.com/Zankorrr">
            Zankorrr
          </a>
          <a className="app-footer-item" href="https://github.com/dimtim1992">
            dimtim1992
          </a>
          <a className="app-footer-item" href="https://github.com/MaxNikitenok">
            MaxNikitenok
          </a>
        </ul>
        <a className="app-footer-item app-footer-link-school" href="https://rs.school/react/">
          RSSchool
        </a>
      </footer>
    </>
  );
}

export default App;
