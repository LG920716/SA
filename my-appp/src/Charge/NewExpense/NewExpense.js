import { useState } from "react";
import { expensesCollectionRef } from "../../firebase-config";
import { addDoc } from "firebase/firestore";
import "./NewExpense.css";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ExpenseForm from "./ExpenseForm";

const NewExpense = (props) => {
  const [isEditing, setIsEditing] = useState(false);

  const isEditingHandler = () => {
    setIsEditing(true);
  };
  const stopEditingHandler = () => {
    setIsEditing(false);
  };
  const saveExpenseDataHandler = async (enterExpenseData) => {
    console.log(enterExpenseData);

    await addDoc(expensesCollectionRef, {
      name: enterExpenseData.name,
      amount: enterExpenseData.amount,
      date: enterExpenseData.date,
      projectName: enterExpenseData.project,
      created_at: new Date(),
      updated_at: new Date(),
    });
    setIsEditing(false);
  };
  return (
    <div className="new-expense">
      {!isEditing && (
        <button onClick={isEditingHandler}>
          <AttachMoneyIcon />
          新增開支
        </button>
      )}

      {isEditing && (
        <ExpenseForm
          onSaveExpenseData={saveExpenseDataHandler}
          onStopEditing={stopEditingHandler}
          expensesItems={props.expensesItems}
          projectItems={props.projectItems}
        />
      )}
    </div>
  );
};

export default NewExpense;
