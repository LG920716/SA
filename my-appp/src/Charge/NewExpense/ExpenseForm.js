import { useState } from "react";
import "./ExpenseForm.css";
import ExpenseButton from "./ExpenseButton";

export default function ExpenseForm(props) {
  const [EnterTitle, setEnterTitle] = useState("");
  const [EnterAmount, setEnterAmount] = useState();
  const [EnterDate, setEnterDate] = useState("");
  const [EnterProject, setEnterProject] = useState("");
  const [EnterType, setEnterType] = useState("");

  const SubmitHandlar = (event) => {
    event.preventDefault();

    const expenseData = {
      name: EnterTitle,
      amount: +EnterAmount,
      date: new Date(EnterDate),
      project: EnterProject,
      type: EnterType
    };

    props.onSaveExpenseData(expenseData);
    setEnterTitle("");
    setEnterAmount();
    setEnterDate("");
    setEnterProject("");
    setEnterType("");
  };

  return (
    <form onSubmit={SubmitHandlar}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input
            type="text"
            value={EnterTitle}
            onChange={(event) => {
              setEnterTitle(event.target.value);
            }}
          />
        </div>
      </div>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Amount</label>
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
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Date</label>
          <input
            type="date"
            value={EnterDate}
            onChange={(event) => {
              setEnterDate(event.target.value);
            }}
          />
        </div>
      </div>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>project</label>
          <input
            type="text"
            list="project-list"
            onChange={(event) => {
              setEnterProject(event.target.value);
            }}
          />
          <datalist id="project-list">
          <option value="一般收支" key="0" />
            {props.projectItems.map((doc) => (
              <option value={doc.name} key={doc.id} />
            ))}
          </datalist>
        </div>
      </div>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>核銷</label>
          <input
            type="text"
            list="type-list"
            onChange={(event) => {
              setEnterType(event.target.value);
            }}
          />
          <datalist id="type-list">
            <option value="不可核銷" key="0" />
            <option value="可核銷-文具費" key="1" />
            <option value="可核銷-印刷費" key="2" />
            <option value="可核銷-保險費" key="3" />
            <option value="可核銷-住宿費" key="4" />
            <option value="可核銷-交通費" key="5" />
            <option value="可核銷-講師費" key="6" />
          </datalist>
        </div>
      </div>
      <div className="new-expense__actions">
        <button type="button" onClick={props.onStopEditing}>
          Cencel
        </button>
        <button type="sumbit">New Expense</button>
      </div>
    </form>
  );
}
