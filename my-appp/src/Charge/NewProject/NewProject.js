import { useState, useEffect } from "react";
import "./NewProject.css";
import ProjectForm from "./ProjectForm";
import { db, projectsCollectionRef } from "../../firebase-config";
import { collection, addDoc, getDoc } from "firebase/firestore";
import { async } from "@firebase/util";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";

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

    setIsEditing(false);
  };
  return (
    <div className="new-project">
      {!isEditing && (
        <button onClick={isEditingHandler} className="bt-right">
          <DashboardCustomizeIcon /> &nbsp; 新增活動
        </button>
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
