import "./BudgetBar.css";

export default function BudgetBar(props) {
  const filterData = props.data.chartDataPoints.filter(
    (data) => data.label === props.data.projectData.name
  );
  let barFillWidth = "0%";
  let label = barFillWidth;
  let style = { backgroundColor: "#007bff" };
  if (filterData[0].budget > 0) {
    barFillWidth =
      Math.round((filterData[0].value / filterData[0].budget) * 100) + "%";

    label = barFillWidth;
  }
  if (Math.round((filterData[0].value / filterData[0].budget) * 100) > 100) {
    label = ">100%";
    style = { backgroundColor: "#F83A3A" };
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
