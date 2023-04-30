import { useState, useEffect } from "react";
import Expenses from "./Expenses/Expenses";
import NewExpense from "./NewExpense/NewExpense";
import NewProject from "./NewProject/NewProject";
import DonutChart from "./DonutChart/DonutChart";
import { db } from "../firebase-config";
import { Collection, getDocs, addDoc } from "firebase/firestore";

const DUMMY_EXPENSES = [
  {
    id: "1",
    title: "Aaaaaaaaaaaa",
    amount: 234,
    date: new Date(2021, 1, 1),
    project: "A",
  },
  {
    id: "2",
    title: "B",
    amount: 234,
    date: new Date(2021, 1, 2),
    project: "B",
  },
  {
    id: "3",
    title: "C",
    amount: 234,
    date: new Date(2021, 1, 3),
    project: "C",
  },
  {
    id: "4",
    title: "D",
    amount: 234,
    date: new Date(2021, 1, 4),
    project: "D",
  },
];

const DUMMY_PROJECT = [
  {
    id: "www",
    name: "aefybi",
    budget: 456,
    date: new Date(2021, 1, 4),
    description: "faghjdcs"
  }
]

export default function Charge() {
  // const [Charge, setCharge] = useState([]);
  const [expenses, setExpenses] = useState(DUMMY_EXPENSES);
  const [project, setProject] = useState([DUMMY_PROJECT]);


  const addExpenseHandler = (expense) => {
    setExpenses((prevExpenses) => {
      return [expense, ...prevExpenses];
    });
  };

  const addProjectHandler = (project) => {
    setProject((prevProject) => {
      return [project, ...prevProject];
    });
  }

  return (
    <div>
      <DonutChart />
      <NewProject onAddProject={addProjectHandler} />
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses items={expenses} />
    </div>
  );
}
