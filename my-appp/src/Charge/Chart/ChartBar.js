import "./ChartBar.css";

export default function ChartBar(props) {
  console.log(props);
  let barFillHeight = "0%";
  if (props.totalCash > 0) {
    barFillHeight = Math.round((props.value / props.totalCash) * 100) + "%";
  }
  const fixedBarWidth = "20px";
  return (
    <div className="chart-bar">
      <div style={{ width: fixedBarWidth }} className="chart-bar__inner">
        <div
          className="chart-bar__fill"
          style={{ height: barFillHeight, width: fixedBarWidth }}
        ></div>
      </div>
      <div className="chart-bar__label">{props.label}</div>
    </div>
  );
}
