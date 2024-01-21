import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchDopeInfoAction } from "./asyncAction";
import { Status, infoEntities, infoSliceState } from "./types";

const initialState = {
  entities: [],
  openInfo: false,
  status: Status.Pending,
} as infoSliceState;

export const dopeinfoSlice = createSlice({
  name: "dopeCardInfo",
  initialState,
  reducers: {
    setOpenInfoTest: (state, action) => {
      state.openInfo = action.payload.open;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchDopeInfoAction.pending, (state) => {
      state.status = Status.Pending;
    });
    builder.addCase(
      fetchDopeInfoAction.fulfilled,
      (state, action: PayloadAction<any[]>) => {
        state.entities = action.payload;
        state.status = Status.Succeeded;
      }
    );
    builder.addCase(fetchDopeInfoAction.rejected, (state) => {
      state.status = Status.Failed;
      state.entities = [];
    });
  },
});

export const { setOpenInfoTest } = dopeinfoSlice.actions;

export default dopeinfoSlice.reducer;
