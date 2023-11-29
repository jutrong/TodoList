import { useSetRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import { toDoState } from "../atoms";

interface IForm {
  toDo: string;
}

function ToDoList() {
  const setToDos = useSetRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldTodos) => [
      { text: toDo, id: Date.now(), category: "TO_DO" },
      ...oldTodos,
    ]);
    setValue("toDo", "");
  };
  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("toDo", {
          required: "Please write To Do",
        })}
        placeholder="Write a to do"
      />
      <button>Add</button>
    </form>
  );
}

export default ToDoList;
