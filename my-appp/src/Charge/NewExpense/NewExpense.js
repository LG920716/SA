import { useState } from "react";
import { expensesCollectionRef } from "../../firebase-config";
import { addDoc } from "firebase/firestore";
import "./NewExpense.css";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ExpenseForm from "./ExpenseForm";

const NewExpense = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [level, setLevel] = useState(localStorage.getItem("level"));

  const isEditingHandler = () => {
    setIsEditing(true);
  };
  const stopEditingHandler = () => {
    setIsEditing(false);
  };
  const saveExpenseDataHandler = async (enterExpenseData) => {
    // console.log(enterExpenseData);
    const status = level == "money" ? 1 : 0;

    await addDoc(expensesCollectionRef, {
      name: enterExpenseData.name,
      amount: enterExpenseData.amount,
      date: enterExpenseData.date,
      projectName: enterExpenseData.project,
      created_at: new Date(),
      updated_at: new Date(),
      type: enterExpenseData.type,
      IOE: enterExpenseData.IOE,
      description: enterExpenseData.description,
      status: status,
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
