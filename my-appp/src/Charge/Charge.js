import { useState } from "react";
import Expenses from "./Expenses/Expenses";
import NewExpense from "./NewExpense/NewExpense";

const DUMMY_EXPENSES = [
  {
    id:'1',
    title:'Aaaaaaaaaaaa',
    amount:234,
    date:new Date(2021,1,1),
    project:'A'
  },
  {
    id:'2',
    title:'B',
    amount:234,
    date:new Date(2021,1,2),
    project:'B'
  },
  {
    id:'3',
    title:'C',
    amount:234,
    date:new Date(2021,1,3),
    project:'C'
  },
  {
    id:'4',
    title:'D',
    amount:234,
    date:new Date(2021,1,4),
    project:'D'
  }
]

export default function Charge(){
    const [expenses, setExpenses] = useState(DUMMY_EXPENSES);

  const addExpenseHandler = expense => {
    setExpenses(prevExpenses => {
      return [expense, ...prevExpenses]
    });
  }
  return(
    <div>
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses items={expenses}/>
    </div>
  );
}