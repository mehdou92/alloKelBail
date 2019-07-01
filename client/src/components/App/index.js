import React, { useState } from 'react';
import Navbar from '../Navbar';
import SignIn from '../SignIn';
import { TodoContext } from '../../store/TodoContext';

function App() {

  const [isLogged, setLogged] = useState(false);

  return (
    <div className="App">
      {/* <TodoContext.Provider
        value={{
          todos: [
            {text: "test context"}
          ]
        }}

        /> */}



      {/* <Navbar /> */}
      <SignIn isLogged={isLogged} />
    </div>
  );
}

export default App;
