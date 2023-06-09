import { useState, useEffect } from "react";
import { format } from "date-fns";
import { db } from "../firebase-config";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import "./ProjectUpdate.css";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function ProjectUpdate(props) {
  console.log(props);
  const [EnterName, setEnterName] = useState(props.data.projectData.name);
  const [Enterbudget, setEnterbudget] = useState(props.data.projectData.budget);
  const [EnterDate, setEnterDate] = useState(
    props.data.projectData.date.toDate()
  );
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
      updated_at: new Date(),
    });

    props.onStopEditing();
    setEnterName("");
    setEnterbudget();
    setEnterDate("");
    setEnterdescription("");
    setFormattedDate("");
  };
  return (
    <Card className="update-card1" sx={{ minWidth: 275 }}>
      <CardContent>
        <div className="update-project">
          <form onSubmit={SubmitHandlar}>
            <div className="update-project__controls">
              <div className="update-project__control">
                <label>名稱</label>
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
                <label>預算</label>
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
            <div className="update-project__controls">
              <div className="update-project__control">
                <label>內容</label>
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
              <button
                type="button"
                className="canel"
                onClick={props.onStopEditing}
              >
                取消
              </button>
              <button type="submit" className="confirm">
                更新活動
              </button>
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
