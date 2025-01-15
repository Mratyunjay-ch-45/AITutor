import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import ChatPage from './components/ChatPage';
import Register from './components/User/Register';
import LogIn from './components/User/LogIn';
import ProtectedRoutes from './components/ProtectedRoutes';
import Quiz from './components/Quiz';
import Reel from './components/Reel';
import LoadingScreen from './components/loadingScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatPage /> }/>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/reel" element={<Reel />} />
        <Route path="/loading" element={<LoadingScreen />} />
      </Routes>
    </Router>
  );
}

export default App;

