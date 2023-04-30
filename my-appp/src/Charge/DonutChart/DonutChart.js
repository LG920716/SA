import Chart from "react-apexcharts";
import Card from "../UI/Card";
import "./DonutChart.css";

export default function DonutChart() {
  return (
    <Card className="donut-chart">
      <Chart
        type="donut"
        width={550}
        height={550}
        series={[25, 25, 25, 15, 10]}
        options={{
          labels: ["哈摟", "2", "3", "4", "5"],
          title: { text: "edw" },
          plotOptions: {
            pie: {
              donut: {
                labels: { show: true, total: { show: true, text: "total money" } },
              },
            },
          },
        }}
      />
    </Card>
  );
}
