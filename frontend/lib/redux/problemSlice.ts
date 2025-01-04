import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
interface problemState {
  search: any;
}

const initialState: problemState = {
  search: "",
};

export const problemSlice = createSlice({
  name: "problem",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setSearch } = problemSlice.actions;

export const selectSearch = (state: RootState) => state.problem.search;

export default problemSlice.reducer;
