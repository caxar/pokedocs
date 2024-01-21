import { RootState } from "../store";

//Селектор
// Что бы типизировать глобальный state импортировал Глобальный тип всех Reducer /RootState
export const selectSearch = (state: RootState) => state.search;
