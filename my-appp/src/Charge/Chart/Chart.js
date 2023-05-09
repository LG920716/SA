import ChartBar from "./ChartBar";

import "./Chart.css";

export default function Chart(props) {
  const dataPointValue = props.dataPoints.map((dataPoint) => dataPoint.value);
  // const totalCash = Math.sum(...dataPointValue);
  const totalCash = dataPointValue.reduce((acc, curr) => acc + curr, 0);

  return (
    <div className="chart">
      {props.dataPoints.map((dataPoint) => (
        <ChartBar
          key={dataPoint.label}
          value={dataPoint.value}
          totalCash={totalCash}
          label={dataPoint.label}
        />
      ))}
    </div>
  );
}
