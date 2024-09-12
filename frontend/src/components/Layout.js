import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Header from './Header';

function Layout({ children }) {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <Header email={user.emailId} />
      <div className="main-content">
        {children}
      </div>
    </div>
  );
}

export default Layout;
