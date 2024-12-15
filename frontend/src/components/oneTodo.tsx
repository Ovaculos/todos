import { OneTodoProps } from "../types"
import todoService from "../services/todoService"

export function OneTodo({ setTodos, setModalTodo, openModal, deleteSelf, ...todo }: OneTodoProps) {
  const { id, title, month, year, completed } = todo

  const displayDate = () => {
    if (month.trim() && year.trim()) {
      return `${month}/${year[2]}${year[3]}`
    } else {
      return 'No Due Date'
    }
  }

  const toggleCompletion = () => {
    todoService.editTodo(id, {completed: !completed})
    setTodos(todos => todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed
        }
      }
      return todo
    }))
  }

  const editTodo = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setModalTodo(todo);
    openModal();
  }

  const handleDelete = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    event.stopPropagation();
    deleteSelf();
  }

  return (
    <li onClick={toggleCompletion}>
      <label>
        <input type='checkbox' checked={completed} readOnly/>
          <a onClick={editTodo}>{title} - {displayDate()}</a> - <a onClick={handleDelete}>Delete</a>
      </label>
    </li>
  )
}
