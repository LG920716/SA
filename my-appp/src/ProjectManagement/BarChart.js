import { useState, useEffect } from "react";
import { projectsCollectionRef, moneyCollectionRef } from "../firebase-config";
import { getDocs } from "firebase/firestore";
import Card from "../Charge/UI/Card";
import NewProject from "../Charge/NewProject/NewProject";
import Warning from "./FinancialWarning";
import "./BarChart.css";

const BarChart = () => {
  const [projects, setProjects] = useState([]);
  const [money, setMoney] = useState();

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await getDocs(projectsCollectionRef);
      setProjects(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    const fetchMoney = async () => {
      const data = await getDocs(moneyCollectionRef);
      const moneyData = data.docs.map((doc) => doc.data());
      const moneyValue = moneyData.length > 0 ? moneyData[0].money : 0;
      setMoney(moneyValue);
    };
    fetchMoney();
  }, []);

  const usedMoney = projects.reduce(
    (total, project) => total + project.budget,
    0
  );

  return (
    <Card className="bar-chart">
      <div className="chart-container">
        {usedMoney > money && <Warning />}
        <div className="bar-budget" style={{ width: "50%" }}>
          {money}
        </div>
        <div className="bar-expense" style={{ width: "10%" }}>
          {usedMoney}
        </div>
      </div>
      <NewProject />
    </Card>
  );
};

export default BarChart;
