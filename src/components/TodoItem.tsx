import { useState } from "react";
import { Todo, useTodoStore } from "../store/todo.store";

export default function TodoItem({todo}: {todo: Todo}) { // inline type of part of props(todo) Not all props {}

  const {toggleCompleted, editTodo, removeTodo} = useTodoStore()
  const [isEditing, setIsEditing] = useState(false)
  const [editedTask, setEditedTask] = useState(todo.task)

  const handleEdit = () => {
    editTodo(todo.id, editedTask)
    setIsEditing(false)
  }

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={()=> toggleCompleted(todo.id)}
      />
      {isEditing ? (
        <input
          type="text"
          value={editedTask}
          onChange={(e)=> setEditedTask(e.target.value)}
        />
      ) : (
        <span style={{textDecoration: todo.completed ? 'line-through' : 'none'}}>
          {todo.task}
        </span>
      )}
      {isEditing ? (
        <button onClick={handleEdit}>Save</button>
      ) : (
        <button onClick={()=> setIsEditing(true)}>Edit</button>
      )}
      <button onClick={()=> removeTodo(todo.id)}>Remove</button>
    </li>
  );
}
