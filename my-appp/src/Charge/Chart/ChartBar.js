import { useState, useEffect } from "react";
import "./ChartBar.css";

export default function ChartBar(props) {
  const [barFillHeight, setBarFillHeight] = useState(0);

  useEffect(() => {
    if (props.totalCash > 0) {
      const fillHeight = Math.round((props.value / props.totalCash) * 100);
      setBarFillHeight(fillHeight);
    }
  }, [props.totalCash, props.value]);

  const fixedBarWidth = "20px";

  const barFillStyles = {
    height: `${barFillHeight}%`,
    width: fixedBarWidth,
    transition: "height 0.5s ease-out",
  };

  return (
    <div className="chart-bar">
      <div style={{ width: fixedBarWidth }} className="chart-bar__inner">
        <div className="chart-bar__fill" style={barFillStyles}></div>
      </div>
      <div className="chart-bar__label">{props.label}</div>
    </div>
  );
}
