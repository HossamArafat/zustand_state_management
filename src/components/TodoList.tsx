import { useTodoStore } from "../store/todo.store";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const todos = useTodoStore(state=> state.todos)

  return (
    <ul className="todo-list">
      {
        todos.map((todo, i)=> (<TodoItem key={i} todo={todo} />))
      }
    </ul>
  );
}
