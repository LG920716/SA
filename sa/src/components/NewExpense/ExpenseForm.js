import { useState } from "react";
import "./ExpenseForm.css";

export default function ExpenseForm(props) {
  const [EnterTitle, setEnterTitle] = useState("");
  const [EnterAmount, setEnterAmount] = useState("");
  const [EnterDate, setEnterDate] = useState("");
  const [EnterProject, setEnterProject] = useState("");
  const titleChangeHandler = (event) => {
    setEnterTitle(event.target.value);
  };
  const amountChangeHandler = (event) => {
    setEnterAmount(event.target.value);
  };
  const dateChangeHandler = (event) => {
    setEnterDate(event.target.value);
  };
  const projectChangeHandler = (event) => {
    setEnterProject(event.target.value);
  };
  const SubmitHandlar = (event) => {
    event.preventDefault();

    const expenseData = {
      title: EnterTitle,
      amount: +EnterAmount,
      date: new Date(EnterDate),
      project: EnterProject,
    };

    props.onSaveExpenseData(expenseData);
    setEnterTitle("");
    setEnterAmount("");
    setEnterDate("");
    setEnterProject("");
  };

  return (
    <form onSubmit={SubmitHandlar}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input type="text" value={EnterTitle} onChange={titleChangeHandler} />
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
            onChange={amountChangeHandler}
          />
        </div>
      </div>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Date</label>
          <input type="date" value={EnterDate} onChange={dateChangeHandler} />
        </div>
      </div>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>project</label>
          {/* <select onChange={projectChangeHandler}>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select> */}
          <input type="text" list="project-list" onChange={projectChangeHandler}/>
          <datalist id="project-list">
            <option value="A" />
            <option value="B" />
            <option value="C" />
            <option value="D" />
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
