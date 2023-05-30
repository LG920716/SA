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

  const totalWidth = 100;

  const moneyRatio = (money / usedMoney) * 100;
  const usedMoneyRatio = (usedMoney / money) * 100;

  const adjustedMoneyRatio = moneyRatio > totalWidth ? totalWidth : moneyRatio;
  const adjustedUsedMoneyRatio =
    usedMoneyRatio > totalWidth ? totalWidth : usedMoneyRatio;

  const moneyWidth = `${adjustedMoneyRatio}%`;
  const usedMoneyWidth = `${adjustedUsedMoneyRatio}%`;

  return (
    <Card className="bar-chart">
      <div className="chart-container">
        {usedMoney > money && <Warning />}
        <div className="bar" style={{ width: moneyWidth }}>
          {money}
        </div>
        <div className="bar" style={{ width: usedMoneyWidth }}>
          {usedMoney}
        </div>
      </div>
      <NewProject />
    </Card>
  );
};

export default BarChart;
