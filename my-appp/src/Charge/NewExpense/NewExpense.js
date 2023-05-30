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
  const saveExpenseDataHandler = async () => {
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
