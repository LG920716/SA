import Chart from "react-apexcharts";
import Card from "../UI/Card";
import NewProject from "../NewProject/NewProject";
import { useState, useEffect } from "react";
import { db, projectsCollectionRef } from "../../firebase-config";
import { async } from "@firebase/util";
import { getDocs } from "firebase/firestore";
import "./DonutChart.css";

export default function DonutChart() {
  const [project, setProject] = useState([]);
  useEffect(() => {
    const getProject = async () => {
      const data = await getDocs(projectsCollectionRef);
      setProject(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getProject();
  }, []);

  return (
    <Card className="donut-chart">
      <Chart
        type="donut"
        width={550}
        height={550}
        series={project.map((doc) => doc.budget)}
        options={{
          labels: project.map((doc) => doc.name),
          title: { text: "edw" },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  total: { show: true, text: "total money" },
                },
              },
            },
          },
        }}
      />
      <NewProject />
    </Card>
  );
}
