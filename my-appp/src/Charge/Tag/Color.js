// import "./Color.css";
// import { useState, useEffect } from "react";
// import { CirclePicker } from "react-color";
// import { ChromePicker } from "react-color";
// import Tab from "@mui/material/Tab";
// import Tabs from "@mui/material/Tabs";
// import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
// import ColorLensIcon from "@mui/icons-material/ColorLens";
// import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
// import { notesCollectionRef } from "../../../../firebase-config";
// import { getDocs } from "firebase/firestore";

// const Tag = ({ tagList, setTagList, tagFrom }) => {
//   const [searchDbTag, setSearchDbTag] = useState([]);
//   const [searchDbTagWait, setSearchDbTagWait] = useState([]);
//   const [colorDbList, setColorDbList] = useState([]);
//   const [colorTotalList, setColorTotalList] = useState([]);
//   const [color, setColor] = useState("#0052cc");
//   const [value, setValue] = useState("1");
//   const [colorOpen, setColorOpen] = useState(false);
//   const [colorCustomOpen, setColorCustomOpen] = useState(false);
//   const [search, setSearch] = useState("");
//   const [colorTagDbCount, setColorTagDbCount] = useState([]);
//   const [colorTagCount, setColorTagCount] = useState([]);
//   const [test, setTest] = useState([]);

//   const colorListDefault = [
//     "#0052cc",
//     "#8ed1fc",
//     "#0693e3",
//     "#ff6900",
//     "#fcb900",
//     "#0097a7",
//     "#7bdcb5",
//     "#00d084",
//     "#eb144c",
//     "#f78da7",
//     "#9900ef",
//     "#9575cd",
//   ];
//   const getCount = (arr) => {
//     return arr.reduce((prev, next) => {
//       prev[next] = prev[next] + 1 || 1;
//       return prev;
//     }, {});
//   };

//   useEffect(() => {
//     const getTags = async () => {
//       const data = await getDocs(notesCollectionRef);
//       const list = data.docs.map((doc) => doc.data().tag);
//       const tags = list.reduce((accumulator, currentValue) => {
//         return accumulator.concat(currentValue);
//       });
//       setSearchDbTag(tags);
//       setSearchDbTagWait(tags);
//     };
//     getTags();
//   }, []);
//   console.log(searchDbTag);
//   useEffect(() => {
//     const DbcolorListArray = searchDbTag.map((tag) => tag.color);
//     const colorListArray = tagList.map((tag) => tag.color);
//     const DbcolorList = DbcolorListArray.filter(
//       (item, i, arr) => arr.indexOf(item) == i
//     );

//     setColorDbList(DbcolorList);
//     setColorTotalList(DbcolorList);
//     setColorTagDbCount(getCount(DbcolorListArray));
//     setColorTagCount(getCount(colorListArray));
//   }, [searchDbTagWait]);
//   console.log("!!!", colorDbList);
//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };
//   const removeTags = (index) => {
//     if (
//       tagList.filter((tag) => tag.color === tagList[index].color).length === 1
//     ) {
//       if (
//         (tagFrom === "create" || tagFrom === "edit") &&
//         colorDbList.filter((color) => color === tagList[index].color).length ===
//           0
//       ) {
//         setColorTotalList(
//           colorTotalList.filter((color) => color !== tagList[index].color)
//         );
//         setColor("#0052cc");
//       } else if (
//         tagFrom === "edit" &&
//         colorTagDbCount[tagList[index].color] ===
//           colorTagCount[tagList[index].color]
//       ) {
//         console.log("!!!ww", colorTagDbCount[tagList[index].color]);
//         console.log("!!!ww123", colorTagCount[tagList[index].color]);
//         setColorDbList(
//           colorDbList.filter((color) => color !== tagList[index].color)
//         );
//         setColorTotalList(
//           colorTotalList.filter((color) => color !== tagList[index].color)
//         );
//         setColor("#0052cc");
//       }
//     }

//     setTagList(tagList.filter((_, tagIntex) => tagIntex !== index));
//   };

//   const addTags = (event) => {
//     if (event.target.value !== "") {
//       setTagList([...tagList, { tagName: event.target.value, color }]);
//       if (colorTotalList.filter((colors) => colors === color).length === 0) {
//         setColorTotalList([...colorTotalList, color]);
//       }
//       event.target.value = "";
//       setSearch("");
//     }
//   };

//   return (
//     <>
//       <div className="choose" style={{}}>
//         <div className="tags-input">
//           <ul id="tags">
//             {tagList.map((tag, index) => (
//               <li key={index} className="tag" style={{ background: tag.color }}>
//                 <span className="tag-title">{tag.tagName}</span>
//                 <span
//                   className="tag-close-icon"
//                   onClick={() => removeTags(index)}
//                 >
//                   <i class="bi bi-x-circle-fill"></i>
//                 </span>
//               </li>
//             ))}
//           </ul>

//           <input
//             type="text"
//             value={search}
//             onKeyUp={(e) => (e.key === "Enter" ? addTags(e) : null)}
//             onChange={(e) => setSearch(e.target.value)}
//             placeholder={tagFrom === "view" ? "" : "請輸入標籤"}
//           />
//           <ul class="list-group" style={{ position: "absolute", zIndex: "20" }}>
//             {searchDbTag
//               .filter((tags, i, arr) => {
//                 return (
//                   search &&
//                   tags.tagName.toLowerCase().includes(search.toLowerCase()) &&
//                   tags.tagName !== search
//                 );
//               })
//               .map((tags) => (
//                 <li
//                   class="list-group-item"
//                   onClick={() => {
//                     setColor(tags.color);
//                     setSearch(tags.tagName);
//                   }}
//                 >
//                   {tags.tagName}
//                 </li>
//               ))}
//           </ul>
//         </div>

//         {tagFrom !== "view" && (
//           <button
//             class="btn btn-primary"
//             style={{ marginLeft: "5px" }}
//             onClick={() => setColorOpen(!colorOpen)}
//           >
//             <FormatColorFillIcon />
//           </button>
//         )}
//         {colorOpen && (
//           <div className="color-picker-tab">
//             <div>
//               <Tabs
//                 value={value}
//                 onChange={handleChange}
//                 style={{ width: "250px" }}
//                 centered
//               >
//                 <Tab label={<ColorLensIcon />} value="1" />
//                 <Tab label={<AccessTimeFilledIcon />} value="2" />
//               </Tabs>
//             </div>

//             {value === "1" && (
//               <div
//                 style={{
//                   background: " rgb(231, 238, 250)",
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   padding: "10px",
//                   width: "250px",
//                   borderRadius: "25px",
//                   marginTop: "15px",
//                 }}
//               >
//                 <center>
//                   <CirclePicker
//                     colors={colorListDefault}
//                     color={color}
//                     onChange={(colors) => {
//                       setColor(colors.hex);
//                     }}
//                   />
//                 </center>
//               </div>
//             )}
//             {value === "2" && (
//               <div
//                 style={{
//                   background: " rgb(231, 238, 250)",
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   padding: "10px",
//                   width: "250px",
//                   borderRadius: "25px",
//                   marginTop: "15px",
//                 }}
//               >
//                 <CirclePicker
//                   colors={colorTotalList}
//                   color={color}
//                   onChange={(colors) => {
//                     setColor(colors.hex);
//                   }}
//                 />
//                 <i
//                   class="bi bi-plus-circle-fill"
//                   style={{ fontSize: "25px" }}
//                   onClick={() => setColorCustomOpen(!colorCustomOpen)}
//                 ></i>
//               </div>
//             )}
//           </div>
//         )}
//         {colorCustomOpen && (
//           <div className="color-custom">
//             <div
//               className="blocker"
//               onClick={() => setColorCustomOpen(!colorCustomOpen)}
//             ></div>

//             <ChromePicker
//               color={color}
//               onChange={(colors) => {
//                 setColor(colors.hex);
//               }}
//             />
//           </div>
//         )}
//       </div>
//     </>
//   );
// };
// export default Tag;
