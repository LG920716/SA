import { createSlice } from "@reduxjs/toolkit";

export const createExpenseSlice = createSlice({
  name: "createExpense",
  initialState: {
    value: {
      id: "",
      name: "",
      amount: 0,
      date: new Date(),
      projectName: "",
      updated_at: new Date(),
      create_at: new Date(),
      IOE: "",
      type: "",
      description: ""
    },
  },
  reducers: {
    setCreateExpense: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setCreateExpense } = createExpenseSlice.actions;

export default createExpenseSlice.reducer;
