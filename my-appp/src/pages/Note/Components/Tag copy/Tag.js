import "./Tag.css";
import { useState, useEffect } from "react";
import { CirclePicker } from "react-color";
import { ChromePicker } from "react-color";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";

const Tag = ({ tagList, setTagList }) => {
  const [colorList, setColorList] = useState([]);
  const [colorDbList, setColorDbList] = useState([
    "#0052cc",
    "#8ed1fc",
    "#0693e3",
    "#ff6900",
    "#fcb900",
    "#7bdcb5",
    "#00d084",
    "#eb144c",
    "#f78da7",
    "#9900ef",
  ]);
  const [colorTotalList, setColorTotalList] = useState([]);
  const [color, setColor] = useState("#0052cc");
  const [value, setValue] = useState("1");
  const [colorOpen, setColorOpen] = useState(false);
  const [colorCustomOpen, setColorCustomOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [searchDbTag, setSearchDbTag] = useState([
    { tagName: "abc", color: "#0052cc" },
    { tagName: "HHH", color: "#8ed1fc" },
    { tagName: "YYY", color: "#0052cc" },
  ]);
  console.log(searchDbTag[0].tagName);

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

  useEffect(() => {
    setColorTotalList(colorDbList.concat(colorList));
  }, [colorList]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const removeTags = (index) => {
    if (
      // colorDbList.filter((colors) => colors === tagList[index].color).length ===
      //   0 &&
      // tagList.filter((tag) => tag.color === tagList[index].color).length === 1
      colorDbList.filter((colors) => colors === tagList[index].color).length ===
        0 &&
      tagList.filter((tag) => tag.color === tagList[index].color).length === 1
    ) {
      setColorList(colorList.filter((color) => color !== tagList[index].color));
      setColor("#0052cc");
    }
    setTagList(tagList.filter((_, tagIntex) => tagIntex !== index));
  };

  const addTags = (event) => {
    if (event.target.value !== "") {
      setTagList([...tagList, { tagName: event.target.value, color }]);
      if (colorTotalList.filter((colors) => colors === color).length === 0) {
        setColorList([...colorList, color]);
      }
      event.target.value = "";
      setSearch("");
    }
  };

  return (
    <>
      <div className="tags-input">
        <ul id="tags">
          {tagList.map((tag, index) => (
            <li key={index} className="tag" style={{ background: tag.color }}>
              <span className="tag-title">{tag.tagName}</span>
              <span
                className="tag-close-icon"
                onClick={() => removeTags(index)}
              >
                <i class="bi bi-x-circle-fill"></i>
              </span>
            </li>
          ))}
        </ul>
        <div>
          <input
            type="text"
            value={search}
            onKeyUp={(e) => (e.key === "Enter" ? addTags(e) : null)}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Press enter to add tags"
          />
          <ul class="list-group" style={{ position: "absolute" }}>
            {searchDbTag
              .filter((tags) => {
                return (
                  search &&
                  tags.tagName.toLowerCase().includes(search.toLowerCase()) &&
                  tags.tagName !== search
                );
              })
              .map((tags) => (
                <li
                  class="list-group-item"
                  onClick={() => {
                    setColor(tags.color);
                    setSearch(tags.tagName);
                  }}
                >
                  {tags.tagName}
                </li>
              ))}
          </ul>
        </div>
      </div>

      <button class="btn btn-primary" onClick={() => setColorOpen(!colorOpen)}>
        <FormatColorFillIcon />
      </button>
      {colorOpen && (
        <div className="color-picker-tab">
          <Tabs
            value={value}
            onChange={handleChange}
            style={{ width: "250px" }}
            centered
          >
            <Tab label={<ColorLensIcon />} value="1" />
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
                width: "250px",
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
                width: "250px",
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
    </>
  );
};
export default Tag;
