import { useState } from "react";
import { db } from "../../firebase-config";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";
import "./ExpenseItem.css";
import ExpenseUpdate from "./ExpenseUpdate";
import Swal from "sweetalert2";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ExpenseItem(props) {
  const [isEditing, setIsEditing] = useState(false);

  const isEditingHandler = () => {
    setIsEditing(true);
  };
  const stopEditingHandler = () => {
    setIsEditing(false);
  };
  // console.log(props);
  // const deleteExpenseHandler = async (id) => {
  //   const expenseDoc = doc(db, "expenses", id);
  //   await deleteDoc(expenseDoc);
  // };
  const deleteProject = (id) => {
    Swal.fire({
      title: "確定刪除?",
      text: `刪除此支出`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "確認刪除",
      cancelButtonText: "取消",
    }).then((result) => {
      if (result.isConfirmed) {
        const del = async () => {
          await deleteDoc(doc(db, "expenses", id));
        };
        del();
        Swal.fire({
          showConfirmButton: false,
          title: "刪除成功",
          text: `已刪除支出`,
          icon: "success",
          timer: 1100,
        });
      }
    });
  };
  return (
    <li>
      <Card className="expense-item">
        <ExpenseDate date={props.date} />
        <div className="expense-item__description">
          <h2>{props.name}</h2>
          <div className="expense-item__price">${props.amount}</div>
          <div>
            <button type="button" onClick={isEditingHandler}>
              <EditIcon />
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
              className="delete-button"
              type="button"
              onClick={() => {
                // deleteExpenseHandler(props.id);
                deleteProject(props.id);
              }}
            >
              <DeleteIcon />
            </button>
          </div>
        </div>
      </Card>
    </li>
  );
}
