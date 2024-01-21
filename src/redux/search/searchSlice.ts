import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SearchItemSlice, SearchiItems, Status } from "./types";
import { fetchSearchActions } from "./asyncActions";

const initialState = {
  items: [],
  search: false,
  searchStatus: Status.Pending, // pending | succeeded | failed
} as SearchItemSlice;

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchPopup: (state, action) => {
      state.search = action.payload;
    },
    closeSearchPopup: (state, action) => {
      state.search = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchSearchActions.pending, (state) => {
      state.searchStatus = Status.Pending;
    });
    builder.addCase(
      fetchSearchActions.fulfilled,
      (state, action: PayloadAction<SearchiItems[]>) => {
        state.items = action.payload;
        state.searchStatus = Status.Succeeded;
      }
    );
    builder.addCase(fetchSearchActions.rejected, (state) => {
      state.searchStatus = Status.Failed;
      state.items = [];
    });
  },
});

export const { closeSearchPopup, setSearchPopup } = searchSlice.actions;

export default searchSlice.reducer;
