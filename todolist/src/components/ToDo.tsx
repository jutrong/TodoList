import { IToDo } from "../atoms";

function ToDo({ text }: IToDo) {
  return (
    <li>
      <span>{text}</span>
    </li>
  );
}

export default ToDo;
