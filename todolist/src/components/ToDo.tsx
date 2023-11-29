import React from "react";
import {
  IToDo,
  toDoState,
  activeCategoryState,
  categoriesState,
} from "../atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

const LiBox = styled.li`
  list-style: none;
`;

const ToDoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 20px 0;
  border-bottom: 0.1px solid ${(props) => props.theme.boxColor};
`;

const ToDoText = styled.span`
  font-size: 16px;
  word-wrap: break-word;
  line-height: 1.5;
`;

const CategoryButtonGrup = styled.div`
  display: flex;
  gap: 5px;
  margin-top: 10px;
`;

const CategoryButton = styled.button`
  height: 20px;
  overflow: hidden;
  font-size: 9px;
  background-color: ${(props) => props.theme.bgColor};
  cursor: pointer;
  color: ${(props) => props.theme.textColor};
  border: 0;
  opacity: 0.5;

  &:hover {
    color: ${(props) => props.theme.accentColor};
    opacity: 1;
  }
`;
const CategoryDeleteButton = styled(CategoryButton)`
  color: #ff6b81;
  opacity: 0.8;

  &:hover {
    color: #ff4757;
  }
`;

const ToDo = ({ text, id }: IToDo) => {
  const setToDos = useSetRecoilState(toDoState);
  const usingCategory = useRecoilValue(activeCategoryState);
  const categories = useRecoilValue(categoriesState);

  const onChange = (newCategory: IToDo["category"]) => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((todo) => todo.id === id);
      const newToDos = { text, id, category: newCategory };
      const chagneToDos = [
        ...oldToDos.slice(0, targetIndex),
        newToDos,
        ...oldToDos.slice(targetIndex + 1),
      ];
      localStorage.setItem("toDos", JSON.stringify(chagneToDos));
      return chagneToDos;
    });
  };

  const onDelete = () => {
    setToDos((oldToDos) => {
      const deleteToDos = oldToDos.filter((todo) => todo.id !== id);
      localStorage.setItem("toDos", JSON.stringify(deleteToDos));
      return deleteToDos;
    });
  };

  return (
    <LiBox>
      <ToDoBox>
        <ToDoText>{text}</ToDoText>
        <CategoryButtonGrup>
          {categories
            .filter((category) => category !== usingCategory)
            .map((moveCategory) => (
              <CategoryButton onClick={() => onChange(moveCategory as any)}>
                #{moveCategory}
              </CategoryButton>
            ))}
          <CategoryDeleteButton onClick={() => onDelete()}>
            #Delte
          </CategoryDeleteButton>
        </CategoryButtonGrup>
      </ToDoBox>
    </LiBox>
  );
};

export default ToDo;
