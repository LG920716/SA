import { useState, useEffect } from "react";
import ProjectItems from "./ProjectItems";
import { projectsCollectionRef, expensesCollectionRef } from "../firebase-config";
import { getDocs } from "firebase/firestore";
import "./Project.css";

export default function Project() {
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
  const chartDataPoints = project.map((item) => ({label: item.name, value: 0, budget: item.budget}));
  expenses.reduce((accumulator, expense) => {
    const project = expense.projectName;
    const amount = expense.amount;
    const dataPoint = accumulator.find((dataPoint) => dataPoint.label === project);
    if (dataPoint) {
      dataPoint.value += amount;
    } 
    return accumulator;
  }, chartDataPoints);


  return (
      <ul class="accordion">
        {project.map((doc) => <ProjectItems projectData={doc} chartDataPoints={chartDataPoints}/>)}
      </ul>
  );
}
