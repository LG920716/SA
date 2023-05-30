import "./Tag.css";
import { useState, useEffect } from "react";
import { CirclePicker } from "react-color";

import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import {
  eventsCollectionRef,
  projectsCollectionRef,
} from "../../firebase-config";
import { getDocs } from "firebase/firestore";
import PaidIcon from "@mui/icons-material/Paid";

const ColorSelectOption = ({ color, setColor, colorTotalList, setColorTotalList}) => {
  const [searchDbTag, setSearchDbTag] = useState([]);
  const [searchDbTagWait, setSearchDbTagWait] = useState([]);
  const [value, setValue] = useState("1");
  const [colorOpen, setColorOpen] = useState(false);
  const [projectList, setProjectList] = useState([]);

  const getTags = async () => {
    try {
      const data = await getDocs(eventsCollectionRef);
      const list = data.docs.map((doc) => doc.data().tag);
      const tags = list.reduce((accumulator, currentValue) => {
        return accumulator.concat(currentValue);
      });
      setSearchDbTag(tags);
      setSearchDbTagWait(tags);

      const project = await getDocs(projectsCollectionRef);
      const projectList = project.docs
        .map((doc) => doc.data().color)
        .map((color) => color);
      setProjectList(projectList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTags();
  }, []);

  console.log(searchDbTag);
  useEffect(() => {
    const DbcolorListArray = searchDbTag.map((tag) => tag.color);
    const DbcolorList = DbcolorListArray.filter(
      (item, i, arr) => arr.indexOf(item) === i
    );
    setColorTotalList(DbcolorList);
  }, [searchDbTagWait]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="choose">
        {
          <button
            class="btn btn-primary"
            onClick={() => setColorOpen(!colorOpen)}
          >
            <FormatColorFillIcon />
          </button>
        }
        {colorOpen && (
          <div
            className="color-picker-tab"
            style={{
              marginLeft: "-23.5rem",
              marginTop: "2.7rem",
              zIndex: "10",
              width: "285px",
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              style={{ width: "268px" }}
              centered
            >
              <Tab label={<PaidIcon />} value="1" />
              <Tab label={<AccessTimeFilledIcon />} value="2" />
            </Tabs>

            {value === "1" && (
              <div
                style={{
                  background: " rgb(231, 238, 250)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "10px",
                  width: "263px",
                  borderRadius: "25px",
                  marginTop: "15px",
                }}
              >
                <CirclePicker
                  colors={projectList}
                  color={color}
                  onChange={(colors) => {
                    setColor(colors.hex);
                  }}
                />
               
              </div>
            )}
            {value === "2" && (
              <div
                style={{
                  background: " rgb(231, 238, 250)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "10px",
                  width: "263px",
                  borderRadius: "25px",
                  marginTop: "15px",
                }}
              >
                <CirclePicker
                  colors={colorTotalList}
                  color={color}
                  onChange={(colors) => {
                    setColor(colors.hex);
                  }}
                />
               
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};
export default ColorSelectOption;
