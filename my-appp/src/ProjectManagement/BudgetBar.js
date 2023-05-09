import "./BudgetBar.css";

export default function BudgetBar(props) {
  let barFillWidth = "50%";
  if (props.data.budget > 0) {
    barFillWidth =
      Math.round((props.data.budget / props.data.budget) * 100) + "%";
  }

  return (
    <div className="chart-budgetBar">
      <div className="chart-budgetBar__inner">
        <div
          className="chart-budgetBar__fill"
          style={{ width: barFillWidth, ...style }}
        ></div>
      </div>
      <div className="chart-budgetBar__label">{label}</div>
    </div>
  );
}
