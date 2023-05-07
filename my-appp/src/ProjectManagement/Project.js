import { useState, useEffect } from "react";
import ProjectItems from "./ProjectItems";
import Card from "../Charge/UI/Card";
import { db, projectsCollectionRef, expensesCollectionRef } from "../firebase-config";
import { Collection, getDocs, addDoc, collectionGroup } from "firebase/firestore";
import "./Project.css";

export default function Project() {
  const [project, setProject] = useState([]);
  useEffect(() => {
    const getProject = async () => {
      const data = await getDocs(projectsCollectionRef);
      setProject(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    };
    getProject();
  },[]);
  // const [activeIndex, setActiveIndex] = useState(-1);

  // const setActiveHAndler = (index) => {
  //   setActiveIndex(index);
  // };

  return (
      <ul class="accordion">
        {project.map((doc) => <ProjectItems projectData={doc}/>)}
      </ul>
    
  );
}
