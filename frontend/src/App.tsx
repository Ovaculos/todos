import { useState, useEffect } from 'react'
import todoService from './services/todoService'
import { Todo, PartialTodo } from './types'
import { Main } from './components/main'
import { Nav } from './components/nav'
import { Modal } from './components/modal'

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [modalTodo, setModalTodo] = useState<PartialTodo>({});
  const [showModal, setShowModal] = useState<boolean>(false);

  const closeModal = (): void => {
    setShowModal(false);
  }

  const openModal = (): void => {
    setShowModal(true)
  }

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await todoService.getTodos();
      setTodos(response as Todo[]);
    }

    fetchTodos()
  }, [])

  const addLocalTodo = (todo: Todo): void => {
    setTodos(todos.concat(todo));
  }

  const editLocalTodo = (id: number, changes: PartialTodo) => {
    setTodos(todos => todos.map(todo => {
      if (todo.id === id) return { ...todo, ...changes }
      return todo
    }));
  }

  const deleteLocalTodo = (id: number): void => {
    setTodos(todos => todos.filter(todo => {
      return todo.id !== id
    }));
  }

  return (
    <>
      <Nav todos={todos} />
      <Main todos={todos}
        setTodos={setTodos}
        setModalTodo={setModalTodo}
        openModal={openModal}
        deleteLocalTodo={deleteLocalTodo} />
      {showModal && <Modal todo={modalTodo}
        modalTodo={modalTodo}
        setModalTodo={setModalTodo}
        closeModal={closeModal}
        addLocalTodo={addLocalTodo}
        editLocalTodo={editLocalTodo} />}
    </>
  );
}

export default App
