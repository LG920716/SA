import { useState,useEffect } from "react";

import ExpenseList from "./ExpenseList";
import Card from "../UI/Card";
import ExpensesFilter from "./ExpenseFilter";
import ExpenseChart from "./ExpenseChart";
import "./Expenses.css";

export default function Expense(props) {
  const [filterProject, setFilterProject] = useState("");
  const filterChangeHandler = (selectedProject) => {
    setFilterProject(selectedProject);
  };
  const filteredExpense = props.expensesItems.filter(
    (doc) => doc.projectName == filterProject
  );

  return (
    <Card className="expenses">
      <ExpensesFilter
        selected={filterProject}
        onChangeFilter={filterChangeHandler}
        expensesItems={props.expensesItems}
        projectItems={props.projectItems}
      />
      <ExpenseChart expenses={filteredExpense} orginExpenses={props.expensesItems}/>
      <ExpenseList items={filteredExpense} projectItems={props.projectItems}/>
    </Card>
  );
}
