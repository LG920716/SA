import { useState } from "react";
import "./ProjectForm.css";

export default function ProjectForm(props) {
  const [EnterName, setEnterName] = useState("");
  const [EnterBudget, setEnterBudget] = useState();
  const [EnterDate, setEnterDate] = useState("");
  const [EnterDescription, setEnterDescription] = useState("");

  const SubmitHandlar = (event) => {
    event.preventDefault();

    const projectData = {
      name: EnterName,
      budget: +EnterBudget,
      date: new Date(EnterDate),
      description: EnterDescription,
    };

    props.onSaveProjectData(projectData);
    setEnterName("");
    setEnterBudget("");
    setEnterDate("");
    setEnterDescription("");
  };

  return (
    <form onSubmit={SubmitHandlar}>
      <div className="new-project__controls">
        <div className="new-project__control">
          <label>Name</label>
          <input
            type="text"
            value={EnterName}
            onChange={(event) => {
                setEnterName(event.target.value);
            }}
          />
        </div>
      </div>
      <div className="new-project__controls">
        <div className="new-project__control">
          <label>Budget</label>
          <input
            type="number"
            min="1"
            step="1"
            value={EnterBudget}
            onChange={(event) => {
                setEnterBudget(event.target.value);
            }}
          />
        </div>
      </div>
      <div className="new-project__controls">
        <div className="new-project__control">
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
      <div className="new-project__controls">
        <div className="new-project__control">
          <label>Description</label>
          <input
            type="text"
            value={EnterDescription}
            onChange={(event) => {
                setEnterDescription(event.target.value);
            }}
          />
        </div>
      </div>
      <div className="new-project__controls">
        <div className="new-project__control">
          <label>Tag</label>
          <input
            type="text"
            value={EnterDescription}
            onChange={(event) => {
                setEnterDescription(event.target.value);
            }}
          />
        </div>
      </div>
      <div className="new-project__actions">
        <button type="button" onClick={props.onStopEditing}>
          Cencel
        </button>
        <button type="sumbit">New Project</button>
      </div>
    </form>
  );
}
