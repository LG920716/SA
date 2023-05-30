import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../../../Calendar/pop.css";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import PaidIcon from "@mui/icons-material/Paid";
import { CirclePicker } from "react-color";
import { ChromePicker } from "react-color";
import { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import WarningIcon from "@mui/icons-material/Warning";
function TagPop({
  modalStatus,
  setModalStatus,
  color,
  value,
  handleChange,
  colorListDefault,
  setColor,
  projectList,
  colorTotalList,
  setColorOpen,
  tagsListDbDefault,
  setTagsListDbDefault,
  setColorListDefault,
  setNoticeTagName,
}) {
  const [colorOpenPop, setColorOpenPop] = useState(true);
  const [colorCustomOpenPop, setColorCustomOpenPop] = useState(false);
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const [addStatus, setAddStatus] = useState(false);

  // const tagsListDbDefault = [
  //   { name: "a", color: "#0052cc" },
  //   { name: "b", color: "#8ed1fc" },
  // ];
  // const colorTotalListDb = [
  //   { name: "a", color: "#0052cc" },
  //   { name: "b", color: "#8ed1fc" },
  //   { name: "ss", color: "#b7138c" },
  // ];

  // useEffect(() => {
  //   if (!modalStatus) {
  //     return;
  //   }

  //   if (projectList.includes(color)) {
  //     setContent(
  //       <p
  //         style={{
  //           backgroundColor: "#E0E1E1",
  //           borderRadius: "5px",
  //           padding: "5px",
  //         }}
  //       >
  //         此為專案標籤 不可修改!
  //       </p>
  //     );
  //     setAddStatus(0);
  //     return;
  //   } else if (color) {
  //     if (colorListDefault.includes(color)) {
  //       setAddStatus(1);
  //       if (
  //         !name &&
  //         tagsListDbDefault.filter((x) => x.color === color)[0].name
  //       ) {
  //         setContent(
  //           <>
  //             <p
  //               style={{
  //                 backgroundColor: "#E0E1E1",
  //                 borderRadius: "5px",
  //                 padding: "5px",
  //               }}
  //             >
  //               已有標籤名為:
  //               {tagsListDbDefault.filter((x) => x.color === color)[0].name}
  //             </p>
  //             <div
  //               style={{
  //                 background: color,
  //                 height: "20px",
  //                 width: "20px",
  //                 borderRadius: "50%",
  //                 marginBottom: "20px",
  //               }}
  //             ></div>
  //           </>
  //         );
  //       } else if (
  //         name &&
  //         tagsListDbDefault.filter((x) => x.color === color)[0].name
  //       ) {
  //         setContent(
  //           <>
  //             <WarningIcon style={{ color: "red" }} />
  //             <p
  //               style={{
  //                 backgroundColor: "#E0E1E1",
  //                 borderRadius: "5px",
  //                 padding: "5px",
  //               }}
  //             >
  //               確定要將現有標籤名 "
  //               {tagsListDbDefault.filter((x) => x.color === color)[0].name}
  //               "改成 " {name}"?
  //             </p>
  //             <div
  //               style={{
  //                 background: color,
  //                 height: "20px",
  //                 width: "20px",
  //                 borderRadius: "50%",
  //                 marginBottom: "20px",
  //               }}
  //             ></div>
  //           </>
  //         );
  //       } else {
  //         setContent(
  //           <>
  //             <p
  //               style={{
  //                 backgroundColor: "#E0E1E1",
  //                 borderRadius: "5px",
  //                 padding: "5px",
  //               }}
  //             >
  //               {name ? "即將新增標籤名為: " + name : "確定不設標籤名稱?"}
  //             </p>
  //             <div
  //               style={{
  //                 background: color,
  //                 height: "20px",
  //                 width: "20px",
  //                 borderRadius: "50%",
  //                 marginBottom: "20px",
  //               }}
  //             ></div>
  //           </>
  //         );
  //       }
  //     } else if (colorTotalList.includes(color)) {
  //       setAddStatus(2);
  //       if (
  //         !name &&
  //         colorTotalListDb.filter((x) => x.color === color)[0].name
  //       ) {
  //         setContent(
  //           <>
  //             <p
  //               style={{
  //                 backgroundColor: "#E0E1E1",
  //                 borderRadius: "5px",
  //                 padding: "5px",
  //               }}
  //             >
  //               已有標籤名為(自訂):
  //               {colorTotalListDb.filter((x) => x.color === color)[0].name}
  //             </p>
  //             <div
  //               style={{
  //                 background: color,
  //                 height: "20px",
  //                 width: "20px",
  //                 borderRadius: "50%",
  //                 marginBottom: "20px",
  //               }}
  //             ></div>
  //           </>
  //         );
  //       }
  //     } else {
  //       setAddStatus(2);
  //       setContent(
  //         <>
  //           <p
  //             style={{
  //               backgroundColor: "#E0E1E1",
  //               borderRadius: "5px",
  //               padding: "5px",
  //             }}
  //           >
  //             {name ? "即將新增標籤名為: " + name : "確定不設標籤名稱?"}
  //           </p>
  //           <div
  //             style={{
  //               background: color,
  //               height: "20px",
  //               width: "20px",
  //               borderRadius: "50%",
  //               marginBottom: "20px",
  //             }}
  //           ></div>
  //         </>
  //       );
  //     }
  //   } else {
  //     setAddStatus(0);
  //     setContent(
  //       <p
  //         style={{
  //           backgroundColor: "#E0E1E1",
  //           borderRadius: "5px",
  //           padding: "5px",
  //         }}
  //       >
  //         請選擇顏色
  //       </p>
  //     );
  //   }
  // }, [color, name]);

  useEffect(() => {
    if (!modalStatus) {
      return;
    }

    if (projectList.includes(color)) {
      setContent(
        <p
          style={{
            backgroundColor: "#E0E1E1",
            borderRadius: "5px",
            padding: "5px",
          }}
        >
          此為專案標籤 不可修改!
        </p>
      );
      setAddStatus(false);
      return;
    } else if (color) {
      if (colorListDefault.includes(color)) {
        setAddStatus(true);
        if (
          !name &&
          tagsListDbDefault.filter((x) => x.color === color)[0].name
        ) {
          setContent(
            <>
              <p
                style={{
                  backgroundColor: "#E0E1E1",
                  borderRadius: "5px",
                  padding: "5px",
                }}
              >
                已有標籤名為:
                {tagsListDbDefault.filter((x) => x.color === color)[0].name}
              </p>

              <div
                style={{
                  background: color,
                  height: "20px",
                  width: "20px",
                  borderRadius: "50%",
                  marginBottom: "20px",
                }}
              ></div>
            </>
          );
        } else if (
          name &&
          tagsListDbDefault.filter((x) => x.color === color)[0].name
        ) {
          setContent(
            <>
              <WarningIcon style={{ color: "red" }} />

              <p
                style={{
                  backgroundColor: "#E0E1E1",
                  borderRadius: "5px",
                  padding: "5px",
                }}
              >
                確定要將現有標籤名 "
                {tagsListDbDefault.filter((x) => x.color === color)[0].name}
                "改成 " {name}"?
              </p>
              <div
                style={{
                  background: color,
                  height: "20px",
                  width: "20px",
                  borderRadius: "50%",
                  marginBottom: "20px",
                }}
              ></div>
            </>
          );
        } else {
          setContent(
            <>
              <p
                style={{
                  backgroundColor: "#E0E1E1",
                  borderRadius: "5px",
                  padding: "5px",
                }}
              >
                {name ? "即將新增標籤名為: " + name : "確定不設標籤名稱?"}
              </p>
              <div
                style={{
                  background: color,
                  height: "20px",
                  width: "20px",
                  borderRadius: "50%",
                  marginBottom: "20px",
                }}
              ></div>
            </>
          );
        }
      } else {
        setAddStatus(true);
        setContent(
          <>
            <p
              style={{
                backgroundColor: "#E0E1E1",
                borderRadius: "5px",
                padding: "5px",
              }}
            >
              {name ? "即將新增標籤名為: " + name : "確定不設標籤名稱?"}
            </p>
            <div
              style={{
                background: color,
                height: "20px",
                width: "20px",
                borderRadius: "50%",
                marginBottom: "20px",
              }}
            ></div>
          </>
        );
      }
    } else {
      setAddStatus(false);
      setContent(
        <p
          style={{
            backgroundColor: "#E0E1E1",
            borderRadius: "5px",
            padding: "5px",
          }}
        >
          請選擇顏色
        </p>
      );
    }
  }, [color, name]);

  const EditColorTag = () => {
    if (!addStatus) {
      setColor("#0052cc");
    } else {
      const list = tagsListDbDefault.filter((x) => x.color !== color);
      const listTag = list.concat([{ name: name, color: color }]);
      setTagsListDbDefault(listTag);

      !colorListDefault.includes(color) &&
        setColorListDefault([color].concat(colorListDefault));

      setColor(color);
      setNoticeTagName(name);
    }
    setColorOpen(true);
    setModalStatus(false);
  };
  console.log(colorTotalList, color);
  return (
    <Modal
      show={modalStatus}
      onHide={(e) => {
        setModalStatus(false);
        setColorOpen(true);
        setColor("#0052cc");
      }}
      centered
    >
      <Modal.Header style={{ border: "none" }} closeButton>
        <Modal.Title id="contained-modal-title-vcenter">新增標籤</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {addStatus && (
          <div className="form-group">
            <label>標籤名稱</label>
            <input
              className="form-control"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
        )}
        <div className="form-group">
          <label>標籤顏色</label>
          {content}

          <button
            class="btn btn-primary"
            style={{ marginLeft: "5px" }}
            onClick={() => setColorOpenPop(!colorOpenPop)}
          >
            <FormatColorFillIcon />
          </button>

          {colorOpenPop && (
            <div
              className="color-picker-tab"
              style={{ marginLeft: "282px", marginTop: "-205px" }}
            >
              <div>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  style={{ width: "269px" }}
                  centered
                >
                  <Tab label={<ColorLensIcon />} value="1" />

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
                        setName("");
                      }}
                    />
                  </center>
                  <i
                    class="bi bi-plus-circle-fill"
                    style={{ fontSize: "25px" }}
                    onClick={() => setColorCustomOpenPop(!colorCustomOpenPop)}
                  ></i>
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
                      setName("");
                    }}
                  />
                </div>
              )}
            </div>
          )}
          {colorCustomOpenPop && (
            <div
              className="color-custom"
              style={{ marginLeft: "275px", marginTop: "-20px" }}
            >
              <div
                className="blocker"
                onClick={() => setColorCustomOpenPop(!colorCustomOpenPop)}
              ></div>

              <ChromePicker
                color={color}
                onChange={(colors) => {
                  setColor(colors.hex);
                  setName("");
                }}
              />
            </div>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer style={{ border: "none" }}>
        <Button onClick={EditColorTag}>新增</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default TagPop;