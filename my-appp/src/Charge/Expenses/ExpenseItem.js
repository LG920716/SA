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
  const [isEditing, setIsEditing] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const expenseItemRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const expenseItemPosition =
        expenseItemRef.current.getBoundingClientRect().top;
      const revealPosition = window.innerHeight - 100;

      if (expenseItemPosition < revealPosition) {
        setIsRevealed(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isEditingHandler = () => {
    setIsEditing(true);
  };

  const stopEditingHandler = () => {
    setIsEditing(false);
  };

  const deleteProject = (id) => {
    // Delete project logic
  };

  return (
    <li ref={expenseItemRef}>
      <Card className={`expense-item ${isRevealed ? "revealed" : ""}`}>
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
                onStopEditing={stopEditingHandler}
                projectItems={props.projectItems}
              />
            )}
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
        </div>
      </Card>
    </li>
  );
}
