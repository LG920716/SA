import { useState, useEffect } from "react";
import Expenses from "./Expenses/Expenses";
import NewExpense from "./NewExpense/NewExpense";
import NewProject from "./NewProject/NewProject";
import DonutChart from "./DonutChart/DonutChart";
import { db, projectsCollectionRef, expensesCollectionRef } from "../firebase-config";
import { Collection, getDocs, addDoc, collectionGroup } from "firebase/firestore";



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
  console.log(expenses);


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
      {/* <NewProject onAddProject={addProjectHandler} /> */}
      <NewExpense onAddExpense={addExpenseHandler} expensesItems={expenses} projectItems={project} />
      <Expenses expensesItems={expenses} projectItems={project} />
    </div>
  );
}
