import { useState, useEffect } from "react";
import Expenses from "./Expenses/Expenses";
import NewExpense from "./NewExpense/NewExpense";
import DonutChart from "./DonutChart/DonutChart";
import { projectsCollectionRef, expensesCollectionRef } from "../firebase-config";
import { getDocs } from "firebase/firestore";


export default function Charge() {
  const [project, setProject] = useState([]);
  const [expenses,setExpenses] = useState([]);
  useEffect(() => {
    const getProject = async () => {
      const data = await getDocs(projectsCollectionRef);
      setProject(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    };
    getProject();
  },[]);
  useEffect(() => {
    const getExpense = async () => {
      const data = await getDocs(expensesCollectionRef);
      setExpenses(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    }
    getExpense();
  }, []);
  // console.log(expenses);

  return (
    <div>
      <DonutChart />
      <NewExpense expensesItems={expenses} projectItems={project} />
      <Expenses expensesItems={expenses} projectItems={project} />
    </div>
  );
}
