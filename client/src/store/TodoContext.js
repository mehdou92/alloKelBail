import React, {Component, createContext} from "react";

export const TodoContext = createContext({
    todos: [],
    loadTodos: () => {},
    newTodo: () => {},
    toggleTodo: () => {},
    deleteTodo: () => {}

});

export class TodoProvider extends Component {
    render(){
        return (
            <div>
                totot
            </div>
        )
    }
} 