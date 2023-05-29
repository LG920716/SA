import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import deleteExpense from "./Redux/deleteExpense";
import updateExpense from "./Redux/updateExpense";
import createExpense from "./Redux/createExpense";

const store = configureStore({
  reducer: {
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
    createExpense: createExpense
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
