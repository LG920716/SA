import { useState } from "react";
import ProjectUpdate from "./ProjectUpdate";
import BudgetBar from "./BudgetBar";
import { db } from "../firebase-config";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

import "./ProjectItems.css";

export default function ProjectItems(props) {
  const [isEditing, setIsEditing] = useState(false);

  const isEditingHandler = () => {
    setIsEditing(true);
  };
  const stopEditingHandler = () => {
    setIsEditing(false);
  };
  // const updateProjectHandler = () => {

  // }
  const deleteProjectHandler = async (id) => {
    const projectsDoc = doc(db, "projects", id);
    await deleteDoc(projectsDoc);
  }
  console.log(props);
  return (
    <li>
      <input type="radio" name="item" id={props.projectData.id} className="accordion-input"/>
      <label for={props.projectData.id} className="accordion-label">{props.projectData.name}</label>
      <ol>
        <li>
          <BudgetBar data={props}/>
        </li>
        <li>{props.projectData.description}</li>
        <li>
          <button type="button" onClick={isEditingHandler}>
            update
          </button>
          {isEditing && (
            <ProjectUpdate
              data={props}
              // onUpdateProject={updateProjectHandler}
              onStopEditing={stopEditingHandler}
            />
          )}
          <button
            type="button"
            onClick={() => {
              deleteProjectHandler(props.projectData.id);
            }}
          >
            delete
          </button>
        </li>
      </ol>
    </li>
  );
}
