import React from 'react';
import LoginPage from './LoginPage';  // Import the LoginPage component
import '../styles/HomePage.css';

function HomePage() {
    return (
      <div className="home-page">
        <div className="login-container">
          <LoginPage />  {/* Render the LoginPage component */}
        </div>
      </div>
    );
  }

export default HomePage;
