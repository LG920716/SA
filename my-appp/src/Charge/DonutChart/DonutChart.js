import Chart from "react-apexcharts";
import Card from "../UI/Card";
import NewProject from "../NewProject/NewProject";
import { useState, useEffect } from "react";
import {
  db,
  projectsCollectionRef,
  moneyCollectionRef,
} from "../../firebase-config";
import { async } from "@firebase/util";
import { getDocs } from "firebase/firestore";
import "./DonutChart.css";

export default function DonutChart() {
  const [project, setProject] = useState([]);
  const [money, setMoney] = useState();

  useEffect(() => {
    const getProject = async () => {
      const data = await getDocs(projectsCollectionRef);
      setProject(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getProject();
  }, []);
  useEffect(() => {
    const getMoney = async () => {
      const data = await getDocs(moneyCollectionRef);
      const moneyData = data.docs.map((doc) => doc.data()); // 取得文件的資料
      const moneyValue = moneyData.length > 0 ? moneyData[0].money : 0; // 假設 money 值在文件的 money 欄位中
      setMoney(moneyValue);
    };
    getMoney();
  }, []);
  const remainMoney =
    money - project.reduce((total, doc) => total + doc.budget, 0);
  const seriesData = [...project.map((doc) => doc.budget), remainMoney];
  console.log(seriesData);
  const label = [...project.map((doc) => doc.name), "剩餘社費"];

  return (
    <div style={{ minWidth: "40%" }}>
      <Card className="donut-chart">
        <Chart
          type="donut"
          width={550}
          height={550}
          series={seriesData}
          options={{
            labels: label,
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
          }}
        />
        <NewProject />
      </Card>
    </div>
  );
}
