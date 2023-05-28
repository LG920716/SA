import { useState } from "react";
import "./ListItem.css";
import Card from "../UI/Card";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ListItem(props) {
    console.log(props);
    const [url, setUrl] = useState(localStorage.getItem("url"));
    const passHandler = () =>{}
    const failHandler = () =>{}
  return (
    <Card className="list-item">
      <img src={url} className="avatar" alt="User Avatar" />
      <div className="expense-item__description">
        <h2>{props.data.description}</h2>
        <div className="expense-item__price">${props.data.amount}</div>
        <div>
          <button type="button" onClick={passHandler}>
            <EditIcon />
          </button>
          <button
            className="delete-button"
            type="button"
            onClick={failHandler}
          >
            <DeleteIcon />
          </button>
        </div>
      </div>
    </Card>
  );
}
