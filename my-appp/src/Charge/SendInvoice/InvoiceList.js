import Card from "../UI/Card";
import ListItem from "./ListItem";
import "./InvoiceList.css";

export default function InvoiceList(props) {
  const filterExpenses = props.expensesItems.filter((doc) => doc.status === 0);
  return (
    <Card className="invoice-list">
      <ul>
        {filterExpenses.map((item) => (
          <ListItem data={item} />
        ))}
      </ul>
    </Card>
  );
}
