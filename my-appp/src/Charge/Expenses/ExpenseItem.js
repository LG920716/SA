import { useState, useEffect, useRef } from "react";
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
  console.log(props);
  const [isEditing, setIsEditing] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [level, setLevel] = useState(localStorage.getItem("level"));
  const expenseItemRef = useRef(null);

  const isEditingHandler = () => {
    setIsEditing(true);
  };

  const stopEditingHandler = () => {
    setIsEditing(false);
  };
  useEffect(() => {
    const revealItem = () => {
      setIsRevealed(true);
    };

    setTimeout(revealItem, 100);

    return () => {
      clearTimeout(revealItem);
    };
  }, []);
  const deleteProject = (id) => {
    Swal.fire({
      title: "確定刪除?",
      text: "刪除此支出",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "刪除",
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
          text: "已刪除支出",
          icon: "success",
          timer: 1100,
        });
      }
    });
  };

  return (
    <li ref={expenseItemRef}>
      {isEditing && (
        <ExpenseUpdate
          data={props}
          onStopEditing={stopEditingHandler}
          projectItems={props.projectItems}
        />
      )}
      <Card className={`expense-item ${isRevealed ? "revealed" : ""}`}>
        <ExpenseDate date={props.date} />
        <div className="expense-item__description">
          <h2>{props.name}</h2>
          <div className="expense-item__price">${props.amount}</div>
          {level === "money" && (
            <div>
              <button type="button" onClick={isEditingHandler}>
                <EditIcon />
              </button>
              <button
                className="delete-button"
                type="button"
                onClick={() => {
                  deleteProject(props.id);
                }}
              >
                <DeleteIcon />
              </button>
            </div>
          )}
        </div>
      </Card>
    </li>
  );
}
