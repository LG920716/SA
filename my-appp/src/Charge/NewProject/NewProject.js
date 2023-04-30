import { useState, useEffect } from "react";
import "./NewProject.css";
import ProjectForm from "./ProjectForm";
import { db, projectsCollectionRef } from "../../firebase-config";
import { collection, addDoc, getDoc } from "firebase/firestore";
import { async } from "@firebase/util";

const NewProject = (props) => {
  const [isEditing, setIsEditing] = useState(false);

  const isEditingHandler = () => {
    setIsEditing(true);
  };
  const stopEditingHandler = () => {
    setIsEditing(false);
  };
  const saveProjectDataHandler = async (enterProjectDate) => {
    await addDoc(projectsCollectionRef, {
      name: enterProjectDate.name,
      budget: enterProjectDate.budget,
      date: enterProjectDate.date,
      description: enterProjectDate.description,
      created_at: new Date(),
      updated_at: new Date(),
    });
    const projectData = {
      ...enterProjectDate,
      id: Math.random().toString(),
    };
    props.onAddProject(projectData);
    setIsEditing(false);
  };
  return (
    <div className="new-project">
      {!isEditing && (
        <button onClick={isEditingHandler}>Add New Project</button>
      )}
      {isEditing && (
        <ProjectForm
          onSaveProjectData={saveProjectDataHandler}
          onStopEditing={stopEditingHandler}
        />
      )}
    </div>
  );
};

export default NewProject;
