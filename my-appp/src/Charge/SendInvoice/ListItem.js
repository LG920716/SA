import { useState, useEffect } from "react";
import "./ListItem.css";
import Card from "../UI/Card";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { db } from "../../firebase-config";
import { doc, deleteDoc, updateDoc, getDocs } from "firebase/firestore";
import Swal from "sweetalert2";
import { moneyCollectionRef } from "../../firebase-config"; 

export default function ListItem(props) {
  const [money, setMoney] = useState();
  useEffect(() => {
    const fetchMoney = async () => {
      const data = await getDocs(moneyCollectionRef);
      const moneyData = data.docs.map((doc) => doc.data());
      const moneyValue = moneyData.length > 0 ? moneyData[0].money : 0;
      setMoney(moneyValue);
    };
    fetchMoney();
  }, []);
  const [url, setUrl] = useState(localStorage.getItem("url"));
  const failHandler = (id) => {
    Swal.fire({
      title: "確定刪除?",
      text: "刪除此要求",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "刪除",
      cancelButtonText: "取消",
    }).then((result) => {
      if (result.isConfirmed) {
        const del = async () => {
          await deleteDoc(doc(db, "expenses", id));
        };
        del();
        Swal.fire({
          showConfirmButton: false,
          title: "刪除成功",
          text: "已刪除支出",
          icon: "success",
          timer: 1100,
        });
      }
    });
  };
  const passHandler = async () => {
    const expenseDoc = doc(db, "expenses", props.data.id);
    await updateDoc(expenseDoc, {
      status: 1,
    });
    const remainMoney =
      props.data.IOE === "支出"
        ? money - props.data.amount
        : money + props.data.amount;
    setMoney(remainMoney);
    const moneyDoc = doc(moneyCollectionRef, "money");

    await updateDoc(moneyDoc, {
      money: remainMoney,
    });
  };
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
            onClick={() => {
              failHandler(props.data.id);
            }}
          >
            <DeleteIcon />
          </button>
        </div>
      </div>
    </Card>
  );
}
