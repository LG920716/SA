import { createSlice } from "@reduxjs/toolkit";

export const updateExpenseSlice = createSlice({
  name: "updateExpense",
  initialState: {
    value: {
      id: "",
      name: "",
      amount: 0,
      date: new Date(),
      projectName: "",
      updated_at: new Date(),
      IOE: "",
      type: "",
    },
  },
  reducers: {
    setUpdateExpense: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setUpdateExpense } = updateExpenseSlice.actions;

export default updateExpenseSlice.reducer;
