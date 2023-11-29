import React from "react";
import { categoriesState, activeCategoryState } from "../atoms";
import { useRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const CategoriesBox = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin: 20px 0;
  gap: 5px;
`;
const CategoryButton = styled.button<{ isActive: boolean }>`
  border: 0;
  background-color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.boxColor};
  color: ${(props) => props.theme.textColor};
  height: 30px;
  width: 100px;
  overflow: hidden;
  border-radius: 15px;
  font-size: 12px;
  cursor: pointer;
`;
const FormBox = styled.div`
  padding-top: 20px;

  span {
    margin-top: 20px;
    font-size: 10px;
  }
`;

const FormStyle = styled.form`
  border: 2px solid ${(props) => props.theme.boxColor};
  display: flex;
  align-items: center;
  border-radius: 12px;
  overflow: hidden;
`;

const FormInput = styled.input`
  font-size: 12px;
  flex: 1;
  border: 0;
  height: 30px;
  outline: none;
  box-shadow: none;
  color: #2f3640;
  padding-left: 10px;
`;

const FormButton = styled.button`
  font-size: 12px;
  border: 0;
  width: 40px;
  height: 30px;
  background-color: gray;
  color: #000;
  cursor: pointer;
`;

interface IForm {
  category: string;
}

const Category = () => {
  const [categories, setCategories] = useRecoilState(categoriesState);
  const { register, setValue, handleSubmit, formState } = useForm<IForm>();
  const [activeCategory, setActiveCategory] =
    useRecoilState(activeCategoryState);
  const handleValid = ({ category }: IForm) => {
    setCategories((prev) => {
      localStorage.setItem("category", JSON.stringify([...prev, category]));
      return [...prev, category];
    });
    setValue("category", "");
  };

  const onChange = (newCategory: IForm) => {
    setActiveCategory(newCategory as any);
  };

  return (
    <div>
      <FormBox>
        <FormStyle onSubmit={handleSubmit(handleValid)}>
          <FormInput
            type="text"
            {...register("category", {
              required: "카테고리를 작성해주세요",
              maxLength: {
                value: 10,
                message: "최대글자는 10자입니다",
              },
            })}
            placeholder="추가할 카테고리 작성"
          />
          <FormButton>Add</FormButton>
        </FormStyle>
        <span>{formState?.errors?.category?.message}</span>
      </FormBox>
      <CategoriesBox>
        {categories.map((category) => (
          <CategoryButton
            isActive={category === activeCategory}
            onClick={() => onChange(category as any)}
          >
            {category}
          </CategoryButton>
        ))}
      </CategoriesBox>
    </div>
  );
};

export default Category;
