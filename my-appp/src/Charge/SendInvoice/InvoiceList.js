import Card from "../UI/Card";
import ListItem from "./ListItem";
import "./InvoiceList.css";

export default function InvoiceList(props) {
  const filterExpenses = props.expensesItems.filter((doc) => doc.status === 0);
  return (
    <Card className="invoice-list">
      {filterExpenses.length === 0 ? (
        <p>目前無請求</p>
      ) : (
        <ul>
          {filterExpenses.map((item) => (
            <ListItem data={item} />
          ))}
        </ul>
      )}
    </Card>
  );
}
