import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import ProductsReducer from "./products/productsSlice";
import dopeinfoReducer from "./dopeinfo/dopeinfoSlice";
import searchReducer from "./search/searchSlice";

export const store = configureStore({
  reducer: {
    products: ProductsReducer,
    dopeCardInfo: dopeinfoReducer,
    search: searchReducer,
  },
});

// Глобальный тип всех Reducer
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
