import { useState, useEffect } from "react";
import { format } from "date-fns";
import { db } from "../../firebase-config";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

import Card from "../UI/Card";
import "./ExpenseUpdate.css";

export default function ExpenseUpdate(props) {
  const [EnterName, setEnterName] = useState(props.data.name);
  const [EnterAmount, setEnterAmount] = useState(props.data.amount);
  const [EnterDate, setEnterDate] = useState(props.data.date.toDate());
  const [EnterPropject, setEnterProject] = useState(props.data.project);
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    setFormattedDate(format(EnterDate, "yyyy-MM-dd"));
  }, [EnterDate]);

  const SubmitHandlar = async (event) => {
    event.preventDefault();

    const expenseDoc = doc(db, "expenses", props.data.id);
    console.log(expenseDoc);

    await updateDoc(expenseDoc, {
      name: EnterName,
      amount: +EnterAmount,
      date: EnterDate,
      projectName: EnterPropject,
      updated_at: new Date(),
    });

    props.onStopEditing();

    setEnterName("");
    setEnterAmount("");
    setEnterDate("");
    setEnterProject("");
    setFormattedDate("");
  };
  return (
    <Card className="update-expense">
      <span className="overlay"></span>
      <form onSubmit={SubmitHandlar}>
        <div className="update-expense__controls">
          <div className="update-expense__control">
            <label>名稱</label>
            <input
              type="text"
              value={EnterName}
              onChange={(event) => {
                setEnterName(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="update-expense__controls">
          <div className="update-expense__control">
            <label>預算</label>
            <input
              type="number"
              min="1"
              step="1"
              value={EnterAmount}
              onChange={(event) => {
                setEnterAmount(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="update-expense__controls">
          <div className="update-expense__control">
            <label>日期</label>
            <input
              type="date"
              value={formattedDate}
              onChange={(event) => {
                setFormattedDate(event.target.value);
                setEnterDate(new Date(event.target.value));
              }}
            />
          </div>
        </div>
        <div className="update-expense__controls">
          <div className="update-expense__control">
            <label>專案</label>
            <input
              type="text"
              value={EnterPropject}
              list="expense-list"
              onChange={(event) => {
                setEnterProject(event.target.value);
              }}
            />
            <datalist id="expense-list">
              {props.projectItems.map((doc) => (
                <option value={doc.name} key={doc.id} />
              ))}
            </datalist>
          </div>
        </div>
        <div className="update-expense__actions">
          <button className="canel" type="button" onClick={props.onStopEditing}>
            取消
          </button>
          <button className="confirm" type="submit">
            更新支出
          </button>
        </div>
      </form>
    </Card>
  );
}
