import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
interface problemState {
  count: number;
  allUser: any;
}

const initialState: problemState = {
  count: 7,
  allUser: [],
};

export const problemSlice = createSlice({
  name: "problem",
  initialState,
  reducers: {
    setCount: (state, action) => {
      state.count = action.payload;
    },
    setAllUser: (state, action) => {
      state.allUser = action.payload;
    },
  },
});

export const { setCount, setAllUser } = problemSlice.actions;

export const selectCount = (state: RootState) => state.problem.count;
export const selectAllUSer = (state: RootState) => state.problem.allUser;

export default problemSlice.reducer;
