import "./ExpenseFilter.css";

const ExpensesFilter = (props) => {
  const dropdownChangeHandler = (event) => {
    props.onChangeFilter(event.target.value);
  };
  return (
    <div className="expenses-filter">
      <div className="expenses-filter__control">
        <label>Filter by project</label>
        <select value={props.selected} onChange={dropdownChangeHandler}>
          <option key="all" value="" />
          {props.projectItems.map((doc) => (
            <option key={doc.id} value={doc.name}>
              {doc.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ExpensesFilter;
