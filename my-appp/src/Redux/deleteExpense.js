import { createSlice } from "@reduxjs/toolkit";

export const deleteExpenseSlice = createSlice({
  name: "deleteExpense",
  initialState: {
    value: {
      id: ""
    }
  },
  reducers: {
    setDeleteExpense: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setDeleteExpense } = deleteExpenseSlice.actions;

export default deleteExpenseSlice.reducer;
