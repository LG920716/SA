import { useState } from "react";
import Card from "../Charge/UI/Card";
import "./ProjectUpdate.css";

export default function ProjectUpdate(props) {
    console.log(props)
  const [EnterName, setEnterName] = useState(props.data.name);
  const [Enterbudget, setEnterbudget] = useState(props.data.budget);
  const [EnterDate, setEnterDate] = useState(props.data.date);
  const [Enterdescription, setEnterdescription] = useState(
    props.data.description
  );

  const SubmitHandlar = (event) => {
    event.preventDefault();

    const updateProjectData = {
      name: EnterName,
      budget: +Enterbudget,
      date: new Date(EnterDate),
      description: Enterdescription,
    };

    props.onUpdateProject(updateProjectData);
    setEnterName("");
    setEnterbudget();
    setEnterDate("");
    setEnterdescription("");
  };
  return (
    <div className="update-project">
      <span className="overlay"></span>
      <form onSubmit={SubmitHandlar}>
        <div className="update-project__controls">
          <div className="update-project__control">
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
        <div className="update-project__controls">
          <div className="update-project__control">
            <label>Budget</label>
            <input
              type="number"
              min="1"
              step="1"
              value={Enterbudget}
              onChange={(event) => {
                setEnterbudget(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="update-project__controls">
          <div className="update-project__control">
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
        <div className="update-project__controls">
          <div className="update-project__control">
            <label>Description</label>
            <input
              type="text"
              value={Enterdescription}
              onChange={(event) => {
                setEnterdescription(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="update-project__actions">
          <button type="button" onClick={props.onStopEditing}>
            Cencel
          </button>
          <button type="submit">update project</button>
        </div>
      </form>
    </div>
  );
}
