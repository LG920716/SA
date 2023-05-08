import { useState, useEffect } from "react";
import { format } from "date-fns";
import { db } from "../firebase-config";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import "./ProjectUpdate.css";

export default function ProjectUpdate(props) {
    console.log(props)
  const [EnterName, setEnterName] = useState(props.data.projectData.name);
  const [Enterbudget, setEnterbudget] = useState(props.data.projectData.budget);
  const [EnterDate, setEnterDate] = useState(props.data.projectData.date.toDate());
  const [Enterdescription, setEnterdescription] = useState(
    props.data.projectData.description
  );
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    setFormattedDate(format(EnterDate, "yyyy-MM-dd"));
  }, [EnterDate]);

  const SubmitHandlar = async (event) => {
    event.preventDefault();
    const projectDoc = doc(db, "projects", props.data.projectData.id);

    await updateDoc(projectDoc, {
      name: EnterName,
      budget: +Enterbudget,
      date: EnterDate,
      description: Enterdescription,
      updated_at: new Date()
    });



    props.onStopEditing();
    setEnterName("");
    setEnterbudget();
    setEnterDate("");
    setEnterdescription("");
    setFormattedDate("");
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
              value={formattedDate}
              // onChange={(event) => {
              //   setEnterDate(event.target.value);
              // }}
              onChange={(event) => {
                setFormattedDate(event.target.value);
                setEnterDate(new Date(event.target.value));
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
