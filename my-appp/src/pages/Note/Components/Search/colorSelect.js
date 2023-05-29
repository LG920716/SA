import "../Tag/Tag.css";
import { useState, useEffect } from "react";
import { CirclePicker } from "react-color";

import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import {
  notesCollectionRef,
  projectsCollectionRef,
  db,
} from "../../../../firebase-config";
import { getDocs, getDoc, doc } from "firebase/firestore";
import PaidIcon from "@mui/icons-material/Paid";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const ColorSelectOption = ({ color, setColor }) => {
  const [searchDbTag, setSearchDbTag] = useState([]);
  const [searchDbTagWait, setSearchDbTagWait] = useState([]);
  const [colorTotalList, setColorTotalList] = useState([]);
  const [value, setValue] = useState("1");
  const [colorOpen, setColorOpen] = useState(false);
  const [projectList, setProjectList] = useState([]);
  const [projectListDb, setProjectListDb] = useState([]);
  const [colorListDefault, setColorListDefault] = useState([]);
  const [noticeTagName, setNoticeTagName] = useState("");
  const [tagsListDbDefault, setTagsListDbDefault] = useState([]);

  const getTags = async () => {
    try {
      const data = await getDocs(notesCollectionRef);
      const list = data.docs.map((doc) => doc.data().tag);
      const tags =
        list.length > 0
          ? list.reduce((accumulator, currentValue) => {
              return accumulator.concat(currentValue);
            })
          : [];
      setSearchDbTag(tags);
      setSearchDbTagWait(tags);

      const project = await getDocs(projectsCollectionRef);
      const projectList = project.docs
        .map((doc) => doc.data().color)
        .map((color) => color);
      setProjectListDb(
        project.docs.map((doc) => ({
          name: doc.data().name,
          color: doc.data().color,
        }))
      );
      setProjectList(projectList);

      const defaultColorDb = await getDoc(doc(db, "tag", "tagsListDbDefault"));
      const defaultColorListDb = defaultColorDb.data().tags;
      setTagsListDbDefault(defaultColorListDb);
      setColorListDefault(defaultColorListDb.map((x) => x.color));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTags();
  }, []);

  useEffect(() => {
    if (projectList.includes(color)) {
      setNoticeTagName(projectListDb.filter((x) => x.color === color)[0].name);
    } else if (colorListDefault.includes(color)) {
      setNoticeTagName(
        tagsListDbDefault.filter((x) => x.color === color)[0].name
      );
    } else {
      setNoticeTagName("");
    }
  }, [color]);

  useEffect(() => {
    const DbcolorListArray = searchDbTag.map((tag) => tag.color);
    const DbcolorList = DbcolorListArray.filter(
      (item, i, arr) => arr.indexOf(item) == i
    );
    setColorTotalList(DbcolorList);
  }, [searchDbTagWait]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      {noticeTagName && (
        <div
          style={{
            backgroundColor: "#E0E1E1",
            borderRadius: "5px",
            padding: "11px 10px 10px 10px",
            height: "50px",
            marginLeft: "5px",
            marginRight: "5px",
          }}
        >
          {noticeTagName}
        </div>
      )}
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
            style={{ marginLeft: "-82px", marginTop: "0px", zIndex: "10" }}
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
                <RestartAltIcon
                  onClick={() => setColor("")}
                  style={{ fontSize: "25px" }}
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
                <RestartAltIcon
                  onClick={() => setColor("")}
                  style={{ fontSize: "25px" }}
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
