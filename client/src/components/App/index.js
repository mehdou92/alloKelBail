import React from 'react';
import Navbar from '../Navbar';
import { TodoContext } from '../../store/TodoContext';

function App() {
  return (
    <div className="App">
      <TodoContext.Provider
        value={{
          todos: [
            {text: "test context"}
          ]
        }}

        />
      <Navbar />
    </div>
  );
}

export default App;
