import ExpenseItem from "./ExpenseItem";

import "./ExpenseList.css";

export default function ExpenseList(props) {
  // console.log(props);
  if (props.items.length === 0) {
    return <h2 className="expenses-list__fallback">目前無支出</h2>;
  }

  return (
    <ul className="expenses-list">
      {props.items.map((Expense) => (
        <ExpenseItem
          key={Expense.id}
          id={Expense.id}
          name={Expense.name}
          amount={Expense.amount}
          date={Expense.date}
          project={Expense.projectName}
          projectItems={props.projectItems}
          type={Expense.type}
          IOE={Expense.IoE}
        />
      ))}
    </ul>
  );
}
