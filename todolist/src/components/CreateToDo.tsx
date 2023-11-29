import React from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import { activeCategoryState, toDoState } from "../atoms";
import styled from "styled-components";

interface IForm {
  toDo: string;
}

const FormBox = styled.div`
  padding: 20px 0;
  span {
    margin-top: 20px;
    font-size: 10px;
  }
`;

const FormStyle = styled.form`
  border: 2px solid ${(props) => props.theme.boxColor};
  display: flex;
  align-items: center;
  border-radius: 15px;
  overflow: hidden;
`;

const FormInput = styled.input`
  font-size: 14px;
  flex: 1;
  border: 0;
  height: 40px;
  outline: none;
  box-shadow: none;
  color: #2f3640;
  padding-left: 10px;
`;

const FormButton = styled.button`
  font-size: 15px;
  width: 40px;
  border: 0;
  height: 40px;
  background-color: ${(props) => props.theme.boxColor};
  color: ${(props) => props.theme.textColor};
  cursor: pointer;
`;

const CreateToDo = () => {
  const { register, handleSubmit, setValue, formState } = useForm<IForm>();
  const [ToDos, setToDos] = useRecoilState(toDoState);
  const activeCategory = useRecoilValue(activeCategoryState);

  const handleValid = ({ toDo }: IForm) => {
    setToDos((prev) => [
      { text: toDo, id: Date.now(), category: activeCategory },
      ...prev,
    ]);
    localStorage.setItem(
      "toDos",
      JSON.stringify([
        { text: toDo, id: Date.now(), category: activeCategory },
        ...ToDos,
      ])
    );
    setValue("toDo", "");
  };

  return (
    <FormBox>
      <FormStyle onSubmit={handleSubmit(handleValid)}>
        <FormInput
          {...register("toDo", {
            required: "To Do List를 작성해주세요",
          })}
          placeholder={`${activeCategory} 카테고리에 작성할 To Do List를 작성해주세요`}
        />
      </FormStyle>
      <span>{formState?.errors?.toDo?.message}</span>
    </FormBox>
  );
};

export default CreateToDo;
