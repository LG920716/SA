import { createSlice } from "@reduxjs/toolkit";

export const passExpenseSlice = createSlice({
  name: "passExpense",
  initialState: {
    value: {
      handler: false,
      id: ""
    }
  },
  reducers: {
    setPassExpense: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setPassExpense } = passExpenseSlice.actions;

export default passExpenseSlice.reducer;