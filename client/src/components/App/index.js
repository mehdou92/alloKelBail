import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import SignIn from '../SignIn';
import { TodoContext } from '../../store/TodoContext';
import AuthProvider from '../Auth/AuthProvider';

function App() {

  const [isLogged, setLogged] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    console.log('Token session: ',token);
  })

    return (
      <AuthProvider>

                {/* <TodoContext.Provider
          value={{
            todos: [
              {text: "test context"}
            ]
          }}
  
          /> */}
          {/* <SignIn isLogged={isLogged} />   */}
  
          <Navbar isLogged={isLogged}/>
      </AuthProvider>

    );  
}

export default App;
