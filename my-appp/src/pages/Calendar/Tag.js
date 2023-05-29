import "./Tag.css";
import { useState, useEffect } from "react";
import { CirclePicker } from "react-color";
import { ChromePicker } from "react-color";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import {
  eventsCollectionRef,
  projectsCollectionRef,
} from "../../firebase-config";
import { getDocs } from "firebase/firestore";
import PaidIcon from "@mui/icons-material/Paid";

const Tag = ({ tagList, setTagList, tagFrom ,colorTotalList, setColorTotalList}) => {
  const [searchDbTag, setSearchDbTag] = useState([]);
  const [searchDbTagWait, setSearchDbTagWait] = useState([]);
  const [colorDbList, setColorDbList] = useState([]);
  //const [colorTotalList, setColorTotalList] = useState([]);
  const [color, setColor] = useState("#0052cc");
  const [value, setValue] = useState("1");
  const [colorOpen, setColorOpen] = useState(false);
  const [colorCustomOpen, setColorCustomOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [colorTagDbCount, setColorTagDbCount] = useState([]);
  const [colorTagCount, setColorTagCount] = useState([]);
  const [projectList, setProjectList] = useState([]);

  const colorListDefault = [
    "#0052cc",
    "#8ed1fc",
    "#0693e3",
    "#ff6900",
    "#fcb900",
    "#0097a7",
    "#7bdcb5",
    "#00d084",
    "#eb144c",
    "#f78da7",
    "#9900ef",
    "#9575cd",
  ];

  const getCount = (arr) => {
    return arr.reduce((prev, next) => {
      prev[next] = prev[next] + 1 || 1;
      return prev;
    }, {});
  };

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
    const colorListArray = tagList.map((tag) => tag.color);
    const DbcolorList = DbcolorListArray.filter(
      (item, i, arr) => arr.indexOf(item) === i
    );
    console.log(":::::::::::::::::::::::::", getCount(DbcolorListArray));
    setColorDbList(DbcolorList);
    setColorTotalList(DbcolorList);
    setColorTagDbCount(getCount(DbcolorListArray));
    setColorTagCount(getCount(colorListArray));
  }, [searchDbTagWait]);

  console.log("!!!", colorTagDbCount);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const removeTags = (index) => {
    if (
      tagList.filter((tag) => tag.color === tagList[index].color).length === 1
    ) {
      if (
        (tagFrom === "create" || tagFrom === "edit") &&
        colorDbList.filter((color) => color === tagList[index].color).length === 0
      ) {
        setColorTotalList(
          colorTotalList.filter((color) => color !== tagList[index].color)
        );
        setColor("#0052cc");
      } else if (
        tagFrom === "edit" &&
        colorTagDbCount[tagList[index].color] ===
          colorTagCount[tagList[index].color]
      ) {
        console.log("!!!ww", colorTagDbCount[tagList[index].color]);
        console.log("!!!ww123", colorTagCount[tagList[index].color]);
        setColorDbList(
          colorDbList.filter((color) => color !== tagList[index].color)
        );
        setColorTotalList(
          colorTotalList.filter((color) => color !== tagList[index].color)
        );
        setColor("#0052cc");
      }
    }
    setTagList(tagList.filter((_, tagIntex) => tagIntex !== index));
  };

  const addTags = (event) => {
    if (
      event.target.value !== "" &&
      [
        ...new Set(
          [{ tagName: event.target.value, color }]
            .map((obj) => {
              const { color, tagName, ...rest } = obj;
              return { tagName, color, ...rest };
            })
            .map((item) => JSON.stringify(item))
        ),
      ].length === 1
    ) {
      setTagList([{ tagName: event.target.value, color }]);
      if (colorTotalList.filter((colors) => colors === color).length === 0) {
        setColorTotalList([...colorDbList, color]);
      }
    }
    event.target.value = "";
    setSearch("");
  };

  return (
    <>
      <div className="choose">
        <div className="tags-input">
          {tagFrom !== "view" && (
            <div>
              <ul id="tags">
                {tagList.map((tag, index) => (
                  <li
                    key={index}
                    className="tag"
                    style={{ background: tag.color }}
                  >
                    <span className="tag-title">{tag.tagName}</span>
                    {tagFrom !== "view" && (
                      <span
                        className="tag-close-icon"
                        onClick={() => removeTags(index)}
                      >
                        <i class="bi bi-x-circle-fill"></i>
                      </span>
                    )}
                  </li>
                ))}
              </ul>
              <input
                style={{ width: "18rem" }}
                type="text"
                value={search}
                onKeyUp={(e) => (e.key === "Enter" ? addTags(e) : null)}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={tagFrom === "view" ? "" : "請輸入標籤"}
              />

              <ul
                class="list-group"
                style={{ position: "absolute", zIndex: "20" }}
              >
                {[
                  ...new Set(
                    searchDbTag
                      .map((obj) => {
                        const { color, tagName, ...rest } = obj;
                        return { tagName, color, ...rest };
                      })
                      .filter((tags) => {
                        return (
                          search &&
                          tags.tagName
                            .toLowerCase()
                            .includes(search.toLowerCase()) &&
                          tags.tagName !== search
                        );
                      })

                      .map((item) => JSON.stringify(item))
                  ),
                ]
                  .filter(
                    (x) =>
                      !tagList
                        .map((obj) => {
                          const { color, tagName, ...rest } = obj;
                          return { tagName, color, ...rest };
                        })
                        .map((item) => JSON.stringify(item))
                        .includes(x)
                  )

                  .map((item) => JSON.parse(item))
                  .map((tags, index) => (
                    <li
                      class="list-group-item"
                      onClick={() => {
                        setColor(tags.color);
                        setSearch(tags.tagName);
                      }}
                      key={index}
                    >
                      <div
                        style={{
                          display: "flex",
                        }}
                      >
                        <div>{tags.tagName}</div>
                        <div
                          style={{
                            background: tags.color,
                            height: "10px",
                            width: "10px",
                            borderRadius: "50%",
                            marginTop: "8px",
                            marginLeft: "5px",
                          }}
                        ></div>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>

        {tagFrom !== "view" && (
          <button
            class="btn btn-primary"
            style={{ marginLeft: "5px" }}
            onClick={() => setColorOpen(!colorOpen)}
          >
            <FormatColorFillIcon />
          </button>
        )}
        {colorOpen && (
          <div className="color-picker-tab">
            <div>
              <Tabs
                value={value}
                onChange={handleChange}
                style={{ width: "269px" }}
                centered
              >
                <Tab label={<ColorLensIcon />} value="1" />
                <Tab label={<PaidIcon />} value="2" />
                <Tab label={<AccessTimeFilledIcon />} value="3" />
              </Tabs>
            </div>

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
                <center>
                  <CirclePicker
                    colors={colorListDefault}
                    color={color}
                    onChange={(colors) => {
                      setColor(colors.hex);
                    }}
                  />
                </center>
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
                <center>
                  <CirclePicker
                    colors={projectList}
                    color={color}
                    onChange={(colors) => {
                      setColor(colors.hex);
                    }}
                  />
                </center>
              </div>
            )}
            {value === "3" && (
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
                <i
                  class="bi bi-plus-circle-fill"
                  style={{ fontSize: "25px" }}
                  onClick={() => setColorCustomOpen(!colorCustomOpen)}
                ></i>
                {/* colorListDefault.concat(projectList).includes(color) */}
              </div>
            )}
          </div>
        )}
        {colorCustomOpen && (
          <div className="color-custom">
            <div
              className="blocker"
              onClick={() => setColorCustomOpen(!colorCustomOpen)}
            ></div>

            <ChromePicker
              color={color}
              onChange={(colors) => {
                setColor(colors.hex);
              }}
            />
          </div>
        )}
      </div>
    </>
  );
};
export default Tag;
