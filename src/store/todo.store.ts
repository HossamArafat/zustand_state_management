import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface Todo {
    id: number;
    task: string;
    completed: boolean;
}

interface TodoStore {
    todos: Todo[];
    addTodo: (task: string)=> void;
    removeTodo: (id: number)=> void;
    editTodo: (id: number, task: string)=> void;
    toggleCompleted: (id: number)=> void;
}

export const useTodoStore = create<TodoStore>()(
    devtools( // for debuging as redux devtools
        persist<TodoStore>(  // for persisting or saving data in local storage
            // 1- set state
            (set)=> ({
                todos: [],
                addTodo: (task)=>
                    set(state=> (
                        { todos: [ ...state.todos, {id: Date.now(), task, completed: false}] }
                    )),
                removeTodo: (id)=> 
                    set(state=> (
                        { todos: state.todos.filter(todo=> todo.id != id) }
                    )),
                editTodo: (id, task)=>
                    set(state=> (
                        {  todos: state.todos.map(todo=> todo.id== id ? {...todo, task} : todo) }
                    )),
                toggleCompleted: (id)=> 
                    set(state=> (
                        { todos: state.todos.map(todo=> todo.id == id ? {...todo, completed:!todo.completed } : todo) }
                    ))
            }),
            // 2- options - local storage
            {
                name: "todo-storage"
            }
        )
    )
)
