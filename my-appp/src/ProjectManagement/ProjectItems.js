import { useState } from "react";
import ProjectUpdate from "./ProjectUpdate";
import BudgetBar from "./BudgetBar";
import { db } from "../firebase-config";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import "./ProjectItems.css";

export default function ProjectItems(props) {
  const [isEditing, setIsEditing] = useState(false);

  const isEditingHandler = () => {
    setIsEditing(true);
  };
  const stopEditingHandler = () => {
    setIsEditing(false);
  };
  const deleteProject = (id) => {
    Swal.fire({
      title: "確定刪除?",
      text: `這個活動不辦了嗎`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "刪除",
      cancelButtonText: "取消",
    }).then((result) => {
      if (result.isConfirmed) {
        const del = async () => {
          await deleteDoc(doc(db, "projects", id));
        };
        del();
        Swal.fire({
          showConfirmButton: false,
          title: "刪除成功",
          text: `已刪除活動`,
          icon: "success",
          timer: 1100,
        });
      }
    });
  };
  console.log(props);
  return (
    <li>
      <input
        type="radio"
        name="item"
        id={props.projectData.id}
        className="accordion-input"
      />
      <label for={props.projectData.id} className="accordion-label">
        {props.projectData.name}
      </label>
      <ol>
        <li>
          <BudgetBar data={props} />
        </li>

        <li>
          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)" }}
          >
            <div>{props.projectData.description}</div>
          </div>
        </li>

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
              // deleteProjectHandler(props.projectData.id)
              deleteProject(props.projectData.id);
            }}
          >
            delete
          </button>
        </li>
      </ol>
    </li>
  );
}
