import { useState, useEffect } from "react";
import Expenses from "./Expenses/Expenses";
import {
  projectsCollectionRef,
  expensesCollectionRef,
} from "../firebase-config";
import { getDocs } from "firebase/firestore";
import InvoiceList from "./SendInvoice/InvoiceList";

export default function Charge() {
  const [level, setLevel] = useState(localStorage.getItem("level"));
  const [project, setProject] = useState([]);
  const [expenses, setExpenses] = useState([]);
  useEffect(() => {
    const getProject = async () => {
      const data = await getDocs(projectsCollectionRef);
      setProject(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getProject();
  },[]);
  useEffect(() => {
    const getExpense = async () => {
      const data = await getDocs(expensesCollectionRef);
      setExpenses(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getExpense();
  }, []);

  return (
    <div>
      {level == "money" && <InvoiceList expensesItems={expenses}/>}
      <Expenses expensesItems={expenses} projectItems={project} />
    </div>
  );
}
