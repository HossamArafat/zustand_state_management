import { useState } from "react";
import { useTodoStore } from "../store/todo.store";

export default function TodoInput() {
  const [task, setTask] = useState("")
  const add = useTodoStore(state=> state.addTodo)

  const handleAdd = () => {
    if(task.trim())
      add(task)
    setTask("")
  }

  return (
    <div className="todo-input">
      <input
        type="text"
        value={task}
        onChange={(e)=> setTask(e.target.value)}
        onKeyDown={(e)=> e.key == 'Enter' && handleAdd()}
        placeholder="Enter a task"
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}
