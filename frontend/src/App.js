// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { QuizProvider } from './context/QuizContext';
import QuizList from './components/QuizList';

import HomePage from './pages/HomePage';
import QuizInstructions from './pages/QuizInstructions';
import Leaderboard from './pages/Leaderboard';
import Layout from './components/Layout';
import QuizPage from './pages/QuizPage';
import './App.css';

const App = ()=> {
 
  return (
    <AuthProvider>
      <QuizProvider>
        <Router>
        <div className="App">
          <Routes>
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/quiz-instructions" element={<Layout><QuizInstructions /></Layout>} />
        <Route path="/leaderboard" element={<Layout><Leaderboard /></Layout>} />
        <Route path="/quiz" element={<Layout><QuizPage  /></Layout>} />
      </Routes>
    </div>
  </Router>
  </QuizProvider>
  </AuthProvider>
  );
};

export default App;