import { MouseEvent } from "react";
import { MainProps, Todo } from "../types";
import { OneTodo } from "./oneTodo";
import todoService from "../services/todoService";

export function Main({ todos, setTodos, setModalTodo, openModal, deleteLocalTodo }: MainProps) {
  const sortTodos = (sortingTodos: Todo[], completionBlind?: boolean) => {
    sortingTodos = sortingTodos.slice()

    // Sort by date
    sortingTodos.sort((a, b) => (Number(b.month) + (Number(b.year) * 100)) -
                                (Number(a.month) + (Number(a.year) * 100)));

    // Put no due dates below valid dates
    sortingTodos.sort((a, b) =>  Number(!a.month) - Number(!b.month))
    sortingTodos.sort((a, b) =>  Number(!a.year) - Number(!b.year))

    // Sort by completed
    if (!completionBlind) sortingTodos.sort((a, b) => Number(a.completed) - Number(b.completed))

    return sortingTodos
  }

  const newTodo = (event: MouseEvent) => {
    event.preventDefault();
    setModalTodo({ });
    openModal();
  };

  const deleteTodo = async (id: number) => {
    const deleted = await todoService.deleteTodo(id);
    if (deleted) deleteLocalTodo(id);
  }

  return (
    <div id='main'>

      <h1>All Todos - {todos.length}</h1>
      <a href="#" onClick={newTodo}>Add new to do</a>
      <ul>
        {sortTodos(todos).map(todo => {
          return (
            <OneTodo {...todo}
            key={todo.id}
            setTodos={setTodos}
            openModal={openModal}
            setModalTodo={setModalTodo}
            deleteSelf={() => deleteTodo(todo.id)} />
          );
        })}
      </ul>
    </div>
  )
}
