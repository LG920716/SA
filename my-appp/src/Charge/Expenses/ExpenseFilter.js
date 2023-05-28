import "./ExpenseFilter.css";
import NewExpense from "../NewExpense/NewExpense";

const ExpensesFilter = (props) => {
  const dropdownChangeHandler = (event) => {
    props.onChangeFilter(event.target.value);
  };

  const searchChangeHandler = (event) => {
    props.onSearch(event.target.value);
  };
  return (
    <div className="expenses-filter">
      <div className="expenses-filter__control">
        <label>依專案尋找</label>
        <select value={props.selected} onChange={dropdownChangeHandler}>
          <option key="all" value="" />
          {props.projectItems.map((doc) => (
            <option key={doc.id} value={doc.name}>
              {doc.name}
            </option>
          ))}
        </select>
      </div>
      <div className="search">
        <label>搜尋:</label>
        <input type="text" onChange={searchChangeHandler} />
      </div>
      <NewExpense
        expensesItems={props.expensesItems}
        projectItems={props.projectItems}
      />
    </div>
  );
};

export default ExpensesFilter;
