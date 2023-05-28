import { useState, useEffect } from "react";

import ExpenseList from "./ExpenseList";
import Card from "../UI/Card";
import ExpensesFilter from "./ExpenseFilter";
import ExpenseChart from "./ExpenseChart";
import "./Expenses.css";

export default function Expense(props) {
  const [filterProject, setFilterProject] = useState("");
  const [filteredExpenses, setfilteredExpenses] = useState("");
  const filterChangeHandler = (selectedProject) => {
    setFilterProject(selectedProject);
  };
  const searchHandler = (searchWord) => {
    setfilteredExpenses(searchWord);
  };
  const filteredExpense = props.expensesItems.filter((doc) => {
    if (filterProject !== "" && doc.projectName !== filterProject) {
      return false;
    }
    if (filteredExpenses !== "" && !doc.name.includes(filteredExpenses)) {
      return false;
    }
    return true;
  });
  

  return (
    <Card className="expenses">
      <ExpensesFilter
        selected={filterProject}
        onChangeFilter={filterChangeHandler}
        onSearch={searchHandler}
        expensesItems={props.expensesItems}
        projectItems={props.projectItems}
      />
      <ExpenseChart
        expenses={filteredExpense}
        orginExpenses={props.expensesItems}
        projectItems={props.projectItems}
      />
      <ExpenseList items={filteredExpense} projectItems={props.projectItems} />
    </Card>
  );
}
