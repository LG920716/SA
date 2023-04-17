import Chart from "../Chart/Chart";

export default function ExpenseChart(props) {
    const chartDataPoints = [
        { label: 'A', value: 0},
        { label: 'B', value: 0},
        { label: 'C', value: 0},
        { label: 'D', value: 0}
    ]

    // for(const expense of props.expenses) {
    //     const expenseProject = expense.project;
    //     chartDataPoints[expenseProject].value += expense.amount;
    // }
    props.orginExpenses.reduce((accumulator, expense) => {
        const project = expense.project;
        const amount = expense.amount;
        const dataPoint = accumulator.find((dataPoint) => dataPoint.label === project);
        if (dataPoint) {
          dataPoint.value += amount;
        }
        return accumulator;
      }, chartDataPoints);
    return <Chart dataPoints={chartDataPoints}/>
}