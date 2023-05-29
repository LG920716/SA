import { useState, useEffect } from "react";
import { format } from "date-fns";
// import { db } from "../../firebase-config";
// import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setUpdateExpense } from "../../Redux/updateExpense";

import Card from "../UI/Card";
import "./ExpenseUpdate.css";

export default function ExpenseUpdate(props) {
  const dispatch = useDispatch();
  console.log(props);
  const [EnterName, setEnterName] = useState(props.data.name);
  const [EnterAmount, setEnterAmount] = useState(props.data.amount);
  const [EnterIOE, setEnterIOE] = useState(props.data.IOE);
  const [EnterType, setEnterType] = useState(props.data.type);
  const [EnterDate, setEnterDate] = useState(props.data.date.toDate());
  const [EnterPropject, setEnterProject] = useState(props.data.project);
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    setFormattedDate(format(EnterDate, "yyyy-MM-dd"));
  }, [EnterDate]);

  const SubmitHandlar = async (event) => {
    event.preventDefault();

    // const expenseDoc = doc(db, "expenses", props.data.id);
    // console.log(expenseDoc);

    // await updateDoc(expenseDoc, {
    //   name: EnterName,
    //   amount: +EnterAmount,
    //   date: EnterDate,
    //   projectName: EnterPropject,
    //   updated_at: new Date(),
    //   IOE: EnterIOE,
    //   type: EnterType,
    // });

    props.onStopEditing();

    setEnterName("");
    setEnterAmount("");
    setEnterDate("");
    setEnterProject("");
    setFormattedDate("");
    setEnterType("");
    setEnterIOE("");
  };
  return (
    <Card className="update-expense">
      <span className="overlay"></span>
      <form
        onSubmit={SubmitHandlar}
        onClick={() => {
          dispatch(
            setUpdateExpense({
              id: props.data.id,
              name: EnterName,
              amount: +EnterAmount,
              date: EnterDate,
              projectName: EnterPropject,
              updated_at: new Date(),
              IOE: EnterIOE,
              type: EnterType,
            })
          );
        }}
      >
        <div className="update-expense__controls">
          <div className="update-expense__control">
            <label>標題</label>
            <input
              type="text"
              value={EnterName}
              onChange={(event) => {
                setEnterName(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="update-expense__controls">
          <div className="update-expense__control">
            <label>金額</label>
            <input
              type="number"
              min="1"
              step="1"
              value={EnterAmount}
              onChange={(event) => {
                setEnterAmount(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="update-expense__controls">
          <div className="update-expense__control">
            <label>日期</label>
            <input
              type="date"
              value={formattedDate}
              onChange={(event) => {
                setFormattedDate(event.target.value);
                setEnterDate(new Date(event.target.value));
              }}
            />
          </div>
        </div>
        <div className="new-expense__controls">
          <div className="new-expense__control">
            <label>收支種類</label>
            <input
              type="text"
              list="IOEList"
              value={EnterIOE}
              onChange={(event) => {
                setEnterIOE(event.target.value);
              }}
            />
            <datalist id="IOEList">
              <option value="收入" />
              <option value="支出" />
            </datalist>
          </div>
        </div>
        <div className="update-expense__controls">
          <div className="update-expense__control">
            <label>用途</label>

            <select
              className="form-select"
              value={EnterPropject}
              onChange={(event) => {
                setEnterProject(event.target.value);
              }}
            >
              <option value="">一般收支</option>
              {props.projectItems.map((doc) => (
                <option value={doc.name} key={doc.id}>
                  {doc.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="new-expense__controls">
          <div className="new-expense__control">
            <label>核銷</label>
            <input
              type="text"
              value={EnterType}
              list="type-list"
              onChange={(event) => {
                setEnterType(event.target.value);
              }}
            />
            <datalist id="type-list">
              <option value="不可核銷" key="0" />
              <option value="可核銷-文具費" key="1" />
              <option value="可核銷-印刷費" key="2" />
              <option value="可核銷-保險費" key="3" />
              <option value="可核銷-住宿費" key="4" />
              <option value="可核銷-交通費" key="5" />
              <option value="可核銷-講師費" key="6" />
            </datalist>
          </div>
        </div>

        <div className="update-expense__actions">
          <button className="canel" type="button" onClick={props.onStopEditing}>
            取消
          </button>
          <button className="confirm" type="submit">
            更新支出
          </button>
        </div>
      </form>
    </Card>
  );
}
