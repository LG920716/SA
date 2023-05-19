import { useState } from "react";
import "./ExpenseForm.css";

export default function ExpenseForm(props) {
  const [EnterTitle, setEnterTitle] = useState("");
  const [EnterAmount, setEnterAmount] = useState();
  const [EnterDate, setEnterDate] = useState("");
  const [EnterProject, setEnterProject] = useState("");

  const SubmitHandlar = (event) => {
    event.preventDefault();

    const expenseData = {
      name: EnterTitle,
      amount: +EnterAmount,
      date: new Date(EnterDate),
      project: EnterProject,
    };

    props.onSaveExpenseData(expenseData);
    setEnterTitle("");
    setEnterAmount();
    setEnterDate("");
    setEnterProject("");
  };

  return (
    <form onSubmit={SubmitHandlar} className="form2">
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>標題</label>
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
          <label>金額</label>
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
          <label>日期</label>
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
          <label>專案</label>
          <input
            type="text"
            list="project-list"
            onChange={(event) => {
              setEnterProject(event.target.value);
            }}
          />
          <datalist id="project-list">
            {props.projectItems.map((doc) => (
              <option value={doc.name} key={doc.id} />
            ))}
          </datalist>
        </div>
      </div>

      <div className="new-expense__actions" style={{ display: "Flex" }}>
        <button
          className="cancel-button"
          type="button"
          style={{ marginRight: "1rem" }}
          onClick={props.onStopEditing}
        >
          取消
        </button>
        <button className="sumbit-button" type="sumbit">
          新增
        </button>
      </div>
    </form>
  );
}
