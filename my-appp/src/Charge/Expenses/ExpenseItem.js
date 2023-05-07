import { useState } from "react";
import { db } from "../../firebase-config";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";
import "./ExpenseItem.css";
import ExpenseUpdate from "./ExpenseUpdate";

export default function ExpenseItem(props) {
  const [isEditing, setIsEditing] = useState(false);

  const isEditingHandler = () => {
    setIsEditing(true);
  };
  const stopEditingHandler = () => {
    setIsEditing(false);
  };
  console.log(props);
  // const updateExpenseHandler = async (updateExpenseData) => {
  //   console.log(updateExpenseData);
  //   setIsEditing(false); 
  //   const expenseDoc = doc(db, "expenses", props.id);
  //   const expenseData = {
  //       name: updateExpenseData.name,
  //       amount: updateExpenseData.amount,
  //       date: updateExpenseData.date,
  //       projectName: updateExpenseData.project,
  //       updated_at: new Date(),
  //   };
  //   await updateDoc(expenseDoc, expenseData);
  // };
  const deleteExpenseHandler = async (id) => {
    const expenseDoc = doc(db, "expenses", id);
    await deleteDoc(expenseDoc);
  };
  return (
    <li>
      <Card className="expense-item">
        <ExpenseDate date={props.date} />
        <div className="expense-item__description">
          <h2>{props.name}</h2>
          <div className="expense-item__price">${props.amount}</div>
          <button type="button" onClick={isEditingHandler}>
            update
          </button>
          {isEditing && (
            <ExpenseUpdate
              data={props}
              // onUpdateExpense={updateExpenseHandler}
              onStopEditing={stopEditingHandler}
              projectItems={props.projectItems}
            />
          )}
          <button
            type="button"
            onClick={() => {
              deleteExpenseHandler(props.id);
            }}
          >
            delete
          </button>
        </div>
      </Card>
    </li>
  );
}
