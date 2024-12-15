import { MouseEvent, ChangeEvent } from 'react'
import { ModalProps, NewTodo, Todo } from "../types";
import todoService from '../services/todoService';

export function Modal({ todo, modalTodo, setModalTodo, closeModal, addLocalTodo, editLocalTodo }: ModalProps) {
  const handleClose = (event: MouseEvent) => {
    if (event.currentTarget === event.target) closeModal();
  }

  const addTodo = async (event: MouseEvent): Promise<void> => {
    event.preventDefault();
    if (modalTodo.title && modalTodo.title.length >= 3) {
      const newTodo: NewTodo = {
        title: modalTodo.title,
        completed: false,
        day: modalTodo.day || '  ',
        month: modalTodo.month || '  ',
        year: modalTodo.year || '    ',
        description: modalTodo.description || '',
      }

      const addedTodo: Todo = await todoService.addTodo(newTodo) as Todo;
      addLocalTodo(addedTodo)
      closeModal();
      setModalTodo({});
    } else {
      console.error('Title is missing or is not at least 3 characters long.')
    }
  }

  const saveEditedTodo = (event: MouseEvent) => {
    event.preventDefault();
    const id = modalTodo.id as number;
    todoService.editTodo(id, modalTodo as Todo);
    editLocalTodo(id, modalTodo);
    closeModal();
  }

  const updateField = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setModalTodo({
      ...modalTodo,
      [name]: value
    });

    console.log(modalTodo)
  };

  const markComplete = (event: MouseEvent) => {
    event.preventDefault()
    if (modalTodo.id) {
      todoService.editTodo(modalTodo.id as number, {completed: !modalTodo.completed})
      editLocalTodo(modalTodo.id, { completed: !modalTodo.completed })
      closeModal();
    } else {
      console.error('A todo must be created in order to toggle its completion.')
    }
  }

  return (
  <form id="modal" onClick={handleClose}>
    <ul>
      <li>
        <label>Title</label>
        <input name="title" id="title" type="text" onChange={updateField} value={modalTodo.title || ''} />
      </li>
      <li>
        <label>Due Date</label>
        <select id="day" name="day" value={modalTodo.day} onChange={updateField}>
          <option value="  ">Day</option>
          <option value="01">1</option>
          <option value="02">2</option>
          <option value="03">3</option>
          <option value="04">4</option>
          <option value="05">5</option>
          <option value="06">6</option>
          <option value="07">7</option>
          <option value="08">8</option>
          <option value="09">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="13">13</option>
          <option value="14">14</option>
          <option value="15">15</option>
          <option value="16">16</option>
          <option value="17">17</option>
          <option value="18">18</option>
          <option value="19">19</option>
          <option value="20">20</option>
          <option value="21">21</option>
          <option value="22">22</option>
          <option value="23">23</option>
          <option value="24">24</option>
          <option value="25">25</option>
          <option value="26">26</option>
          <option value="27">27</option>
          <option value="28">28</option>
          <option value="29">29</option>
          <option value="30">30</option>
          <option value="31">31</option>
        </select>
        <select id="month" name="month" value={modalTodo.month} onChange={updateField}>
          <option value="  ">Month</option>
          <option value="01">January</option>
          <option value="02">February</option>
          <option value="03">March</option>
          <option value="04">April</option>
          <option value="05">May</option>
          <option value="06">June</option>
          <option value="07">July</option>
          <option value="08">August</option>
          <option value="09">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
        <select id="year" name="year" value={modalTodo.year} onChange={updateField}>
          <option value="    ">Year</option>
          <option>2014</option>
          <option>2015</option>
          <option>2016</option>
          <option>2017</option>
          <option>2018</option>
          <option>2019</option>
          <option>2020</option>
          <option>2021</option>
          <option>2022</option>
          <option>2023</option>
          <option>2024</option>
          <option>2025</option>
        </select>
      </li>
      <li>
        <label>Description</label>
          <textarea name="description" id="description" value={modalTodo.description} onChange={updateField}></textarea>
      </li>
      <li>
        <button onClick={todo.id ? saveEditedTodo : addTodo}>Save</button>
        <button id="mark_complete" onClick={markComplete}>Mark as Complete</button>
      </li>
    </ul>
  </form>
  )
}
