type Day = '  ' | '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '20' | '21' | '22' | '23' | '24' | '25' | '26' | '27' | '28' | '29' | '30' | '31'
type Month = '  ' | '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12'
type Year = '    ' | '2014' | '2015' | '2016' | '2017' | '2018' | '2019' | '2020' | '2021' | '2022' | '2023' | '2024' | '2025'

export interface Todo {
  id: number,
  title: string,
  completed: boolean,
  day: Day,
  month: Month,
  year: Year,
  description: string,
}

export type NewTodo = Omit<Todo, 'id'>;
export type PartialTodo = Partial<Todo>;

export interface MainProps {
  todos: Todo[],
  setTodos: SetTodos,
  setModalTodo: SetModalTodo,
  openModal: () => void,
  deleteLocalTodo: (id: number) => void,
}

export interface NavProps {
  todos: Todo[],
}

export interface ModalProps {
  todo: PartialTodo,
  modalTodo: PartialTodo,
  setModalTodo: SetModalTodo,
  closeModal: () => void,
  addLocalTodo: AddLocalTodo,
  editLocalTodo: EditLocalTodo,
}

export type OneTodoProps = Todo & {
  openModal: () => void,
  setTodos: SetTodos,
  setModalTodo: SetModalTodo,
  deleteSelf: () => void,
}

type AddLocalTodo = (todo: Todo) => void;
type EditLocalTodo = (id: number, newProps: PartialTodo) => void;
type SetModalTodo = React.Dispatch<React.SetStateAction<Partial<Todo>>>;
type SetTodos = React.Dispatch<React.SetStateAction<Todo[]>>;
