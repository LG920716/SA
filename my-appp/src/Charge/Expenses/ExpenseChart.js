import Chart from "../Chart/Chart";

export default function ExpenseChart(props) {
  const chartDataPoints = props.projectItems.map((item) => ({label: item.name, value: 0}));

  props.orginExpenses.reduce((accumulator, expense) => {
    const project = expense.project;
    const amount = expense.amount;
    const dataPoint = accumulator.find((dataPoint) => dataPoint.label === project);
    if (dataPoint) {
      dataPoint.value += amount;
    } 
    return accumulator;
  }, chartDataPoints);
  const totalCash = chartDataPoints.reduce((sum, dataPoint) => sum + dataPoint.value, 0);

  return <Chart dataPoints={chartDataPoints} totalCash={totalCash}/>;
}