import axios from "axios";
import { NewTodo, PartialTodo, Todo } from "../types";

const baseUrl = 'http://localhost:3000/api/todos';

const getTodos = async () => {
  const response = await axios.get<Todo[]>(baseUrl);
  return response.data
}

const addTodo = async (todo: NewTodo) => {
  try {
    const addedTodo = await axios.post<NewTodo>(baseUrl, todo);
    return addedTodo.data as Todo
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error('Error in adding todo. Incorrect or incomplete data.');
  }
}

const getTodo = async (id: number) => {
  try {
    const response = await axios.get<Todo>(`${baseUrl}/${id}`);
    return response.data as Todo;
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(`Todo with id ${id} doesn't exist`)
  }
}

const editTodo = async (id: number, newProps: PartialTodo) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, newProps);
    return response.data as Todo;
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(`Todo with id ${id} doesn't exist`)
  }
}

const deleteTodo = async (id: number) => {
  try {
    await axios.delete(`${baseUrl}/${id}`);
    return true
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(`Todo with id ${id} doesn't exist`)
  }
}

export default {
  getTodos,
  addTodo,
  getTodo,
  editTodo,
  deleteTodo
}
