import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCreateExpense } from "../../Redux/createExpense";
import "./ExpenseForm.css";

export default function ExpenseForm(props) {
  const dispatch = useDispatch();
  const [EnterTitle, setEnterTitle] = useState("");
  const [EnterAmount, setEnterAmount] = useState();
  const [EnterDate, setEnterDate] = useState("");
  const [EnterUser, setEnterUser] = useState("");
  //本來想用Type 但會重複所以用income or expenditure的開頭取縮寫
  const [EnterIOE, setEnterIOE] = useState("");
  const [EnterProject, setEnterProject] = useState("一般收支");
  const [EnterType, setEnterType] = useState("");
  const [EnterDescription, setEnterDescription] = useState("");
  const [level, setLevel] = useState(localStorage.getItem("level"));
  const status = level == "money" ? 1 : 0;

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        dispatch(
          setCreateExpense({
            name: EnterTitle,
            amount: +EnterAmount,
            date: new Date(EnterDate),
            project: EnterProject,
            type: EnterType,
            IOE: EnterIOE,
            description: EnterDescription,
            updated_at: new Date(),
            create_at: new Date(),
            status: status,
            user: EnterUser
          })
        );
        props.onSaveExpenseData();
      }}
      className="form2"
    >
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>標題</label>
          <input
            type="text"
            value={EnterTitle}
            onChange={(event) => {
              setEnterTitle(event.target.value);
            }}
          />
        </div>
      </div>
      {level !== "money" && (
        <div className="new-expense__controls">
          <div className="new-expense__control">
            <label>敘述</label>
            <input
              type="text"
              value={EnterDescription}
              onChange={(event) => {
                setEnterDescription(event.target.value);
              }}
            />
          </div>
        </div>
      )}
      {level !== "money" && (
        <div className="new-expense__controls">
          <div className="new-expense__control">
            <label>請求者</label>
            <input
              type="text"
              value={EnterUser}
              onChange={(event) => {
                setEnterUser(event.target.value);
              }}
            />
          </div>
        </div>
      )}
      <div className="new-expense__controls">
        <div className="new-expense__control">
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
      <div className="new-expense__controls">
        <div className="new-expense__control">
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
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>用途</label>
          <input
            type="text"
            list="project-list"
            onChange={(event) => {
              setEnterProject(event.target.value);
            }}
          />
          <datalist id="project-list">
            <option value="一般收支" key="0" />
            {props.projectItems.map((doc) => (
              <option value={doc.name} key={doc.id} />
            ))}
          </datalist>
        </div>
      </div>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>核銷</label>
          <input
            type="text"
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

      <div className="new-expense__actions">
        <button
          className="cancel-button"
          type="button"
          style={{ marginRight: "1rem" }}
          onClick={props.onStopEditing}
        >
          取消
        </button>
        <button className="sumbit-button" type="sumbit">
          新增
        </button>
      </div>
    </form>
  );
}
