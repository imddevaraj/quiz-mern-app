import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import { useAuth } from '../context/AuthContext';
const apiUrl = process.env.REACT_APP_API_URL;
const Header = () => {
  const { user } = useAuth();
  const emailId = user?.emailId;
  const image = '/images/logo.png'; 
  const imageUrl = `${apiUrl}${image}`;
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-left">
          <img src={imageUrl} alt="App Logo" className="app-logo" />
          <h1 className="app-title">Community Of Practice - Internet Of Things</h1>
        </div>
        <div className="header-right">
          <div className="email-display">
            {emailId &&
               <p>Welcome, {emailId}</p>
            }
          </div>
          <nav className="header-menu">
           
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
