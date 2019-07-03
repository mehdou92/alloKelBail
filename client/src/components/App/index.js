import React, { useEffect } from 'react';
import Navbar from '../Navbar';
import AuthProvider from '../Auth/AuthProvider';

function App() {

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    console.log('Token session: ', token);
  })

  return (
    <AuthProvider>
      <Navbar />
    </AuthProvider>

  );
}

export default App;
