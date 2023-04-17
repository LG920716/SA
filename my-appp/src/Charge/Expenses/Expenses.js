import { useState } from "react";

import ExpenseList from "./ExpenseList";
import Card from "../UI/Card";
import ExpensesFilter from "./ExpenseFilter";
import ExpenseChart from "./ExpenseChart";
import "./Expenses.css";

export default function Expense(props) {
  const [filterProject, setFilterProject] = useState("A");
  const filterChangeHandler = (selectedProject) => {
    setFilterProject(selectedProject);
    console.log(selectedProject);
  };
  const filteredExpense = props.items.filter(
    (expense) => expense.project == filterProject
  );

  return (
    <Card className="expenses">
      <ExpensesFilter
        selected={filterProject}
        onChangeFilter={filterChangeHandler}
      />
      <ExpenseChart expenses={filteredExpense} orginExpenses={props.items}/>
      <ExpenseList items={filteredExpense} />
    </Card>
  );
}
