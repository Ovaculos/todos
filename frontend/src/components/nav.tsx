import { NavProps } from "../types";
import { Todo } from "../types";

export function Nav({ todos }: NavProps) {
  return (
    <div id='navbar'>
      {todos.map((todo: Todo) => {
        return (
          <ul key={todo.id}>
            <li>This</li>
            <li>is</li>
            <li>the</li>
            <li>navbar</li>
          </ul>
        );
      })}
    </div>
  )
}
