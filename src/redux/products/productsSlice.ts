import { createSlice } from "@reduxjs/toolkit";
import { Status, ProductSliceState } from "./types";
import { fetchProductsAction } from "./asyncActions";

const initialState = {
  entities: [],
  search: "",
  type: "normal",
  currentPage: 1,
  status: Status.Pending, // pending | succeeded | failed
} as ProductSliceState;

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setTypes: (state, action) => {
      state.type = action.payload;
    },
    changeSearch: (state, action) => {
      state.search = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchProductsAction.pending, (state) => {
      state.status = Status.Pending;
    });
    builder.addCase(fetchProductsAction.fulfilled, (state, action) => {
      state.entities = action.payload;
      state.status = Status.Succeeded;
    });
    builder.addCase(fetchProductsAction.rejected, (state) => {
      state.status = Status.Failed;
      state.entities = [];
    });
  },
});

export const { setTypes, changeSearch } = productsSlice.actions;

export default productsSlice.reducer;
