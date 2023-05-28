import Chart from "react-apexcharts";
import Card from "../UI/Card";
import NewProject from "../NewProject/NewProject";
import { useState, useEffect } from "react";
import { projectsCollectionRef, moneyCollectionRef } from "../../firebase-config";
import { getDocs } from "firebase/firestore";
import "./DonutChart.css";

export default function DonutChart() {
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

  const remainMoney = money - projects.reduce((total, project) => total + project.budget, 0);
  const seriesData = [...projects.map((project) => project.budget), remainMoney];
  const labels = [...projects.map((project) => project.name), "剩餘社費"];
  const colors = [...projects.map((project) => project.color), "#999999"]; // 將每個專案的color欄位與預設顏色配對

  const options = {
    labels: labels,
    title: { text: "" },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: { show: true, text: "總金額" },
          },
        },
      },
    },
    colors: colors, // 設定圖表的顏色
  };

  return (
    <div style={{ minWidth: "40%" }}>
      <Card className="donut-chart">
        <Chart
          type="donut"
          width={550}
          height={550}
          series={seriesData}
          options={options}
        />
        <NewProject />
      </Card>
    </div>
  );
}
