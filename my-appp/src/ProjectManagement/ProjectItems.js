import { useState } from "react";
import ProjectUpdate from "./ProjectUpdate";
import BudgetBar from "./BudgetBar";
import { db } from "../firebase-config";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import "./ProjectItems.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

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
      text: "這個活動不辦了嗎",
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
          text: "已刪除活動",
          icon: "success",
          timer: 1100,
        });
      }
    });
  };
  console.log(props);

  return (
    <Accordion>
      <AccordionSummary
        style={{ height: "5rem" }}
        expandIcon={<ExpandMoreIcon />}
        aria-controls={props.projectData.id}
        id={props.projectData.id}
      >
        <Typography>{props.projectData.name}</Typography>
      </AccordionSummary>
      <div>
        <AccordionDetails>
          <ol>
            <li>
              <p className="p1">已使用：</p>
              <BudgetBar data={props} />
            </li>
            <li>
              <div>
                <p className="p1">內容</p>
                <div>{props.projectData.description}</div>
              </div>
            </li>
            <li className="accordion-button1">
              <button type="button" onClick={isEditingHandler}>
                <EditIcon />
              </button>
              {isEditing && (
                <ProjectUpdate
                  data={props}
                  onStopEditing={stopEditingHandler}
                />
              )}
              <button
                className="delete-button"
                type="button"
                onClick={() => {
                  deleteProject(props.projectData.id);
                }}
              >
                <DeleteIcon />
              </button>
            </li>
          </ol>
        </AccordionDetails>
      </div>
    </Accordion>
  );
}
