import { atom, selector } from "recoil";

export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export interface IToDo {
  text: string;
  id: number;
  category: string;
}

export const categoriesState = atom({
  key: "categoies",
  default: (() => {
    const stroeDate = localStorage.getItem("category");
    if (stroeDate) {
      const parseDate = JSON.parse(stroeDate);
      if (Array.isArray(parseDate)) {
        return parseDate;
      }
    }
    return ["TO_DO", "DOING", "DONE"];
  })(),
});

export const activeCategoryState = atom({
  key: "category",
  default: "TO_DO",
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: (() => {
    const stroeDate = localStorage.getItem("toDos");
    if (stroeDate) {
      const parseDate = JSON.parse(stroeDate);
      if (Array.isArray(parseDate)) {
        return parseDate;
      }
    }
    return [];
  })(),
});

export const isDarkAtom = atom({
  key: "isDark",
  default: true,
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(activeCategoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
