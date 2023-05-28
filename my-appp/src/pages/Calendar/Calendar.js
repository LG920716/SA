import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { eventsCollectionRef, db } from "../../firebase-config";
import MyVerticallyCenteredModal from "./pop";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./Calendar.css";
import ColorSelectOption from "./colorSelect";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

moment.locale("zh-tw");
const localizer = momentLocalizer(moment);

export default function Calendars({ isAuth }) {
  const [eventsData, setEventsData] = useState([]);
  const [modalStatus, setModalStatus] = useState(false);
  const [delStatus, setDelStatus] = useState(false);
  const [eventId, setEventId] = useState("");

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const [eventInput, setEventInput] = useState("");
  const [startDate, setStartDate] = useState(new Date(today));
  const [endDate, setEndDate] = useState(new Date(tomorrow));
  const [backgroundColor, setbackgroundColor] = useState("red");
  const [tagList, setTagList] = useState([]);

  const [searchInput, setSearchInput] = useState("");
  const [color, setColor] = useState("");
  
  let navigate = useNavigate();
  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);

  const handleSave = async () => {
    setModalStatus(false);
    if (!eventInput) {
      return alert("請輸入活動名稱");
    }
    if (startDate >= endDate) {
      return alert("開始時間必須早於結束時間");
    }
    try {
      const newEventRef = await addDoc(eventsCollectionRef, {
        start: startDate,
        end: endDate,
        title: eventInput,
        backgroundColor: tagList.length > 0 ? tagList[0].color : "rgba(29, 131, 220, 0.8)",
        tag: tagList ? tagList : [],
      });
      const newEvent = {
        start: startDate,
        end: endDate,
        title: eventInput,
        backgroundColor: tagList.length > 0 ? tagList[0].color : "rgba(29, 131, 220, 0.8)",
        tag: tagList ? tagList : [],
        id: newEventRef.id,
      };
      setEventsData((prevData) => [...prevData, newEvent]);
    } catch (err) {
      console.error(err);
    }
  };

  const getEvents = async () => {
    try {
      const data = await getDocs(eventsCollectionRef);
      let filteredEvents = data.docs.map((doc) => ({
        start: doc.data().start.toDate(),
        end: doc.data().end.toDate(),
        title: doc.data().title,
        id: doc.id,
        backgroundColor: doc.data().backgroundColor,
        tag: doc.data().tag,
      }));
      if (searchInput.trim() !== "" && color !== "") {
        filteredEvents = filteredEvents.filter((event) =>
          event.title.includes(searchInput) ||
          event.tag.some((tag) => tag.tagName.includes(searchInput)) ||
          event.tag.some((tag) => tag.color.includes(color))
        );
      }
      else if (searchInput.trim() !== "") {
        filteredEvents = filteredEvents.filter((event) =>
          event.title.includes(searchInput) ||
          event.tag.some((tag) => tag.tagName.includes(searchInput)) 
        );
      }
      else if (color !== "") {
        filteredEvents = filteredEvents.filter((event) =>
          event.tag.some((tag) => tag.color.includes(color))
        );
      }
      setEventsData(filteredEvents.length > 0 ? filteredEvents : []);
    } catch (err) {
      console.error(err);
    }
  };  
  
  useEffect(() => {
    getEvents();
  }, [searchInput, color]);  

  console.log("eventId", eventId);
  console.log("title", eventInput);
  console.log("startDate", startDate);
  console.log("endDate", endDate);
  console.log("tag", tagList);
  console.log("backgroundColor", backgroundColor);
  console.log(endDate > startDate);

  const handleClose = () => {
    setModalStatus(false);
    setDelStatus(false);
  };

  const handleSlotSelectEvent = (slotInfo) => {
    setStartDate(slotInfo.start);
    setEndDate(slotInfo.end);
    setbackgroundColor(slotInfo.backgroundColor);
    setTagList([]);
    setModalStatus(true);
    setEventInput("");
  };

  const handleOnSelectEvent = (e) => {
    setDelStatus(true);
    setStartDate(e.start);
    setEndDate(e.end);
    setEventInput(e.title);
    setbackgroundColor(e.backgroundColor);
    setTagList(e.tag);
    setEventId(e.id);
    setModalStatus(true);
  };

  const deletehandle = (id) => {
    Swal.fire({
      title: "確定刪除?",
      text: "確定刪除此行程",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "刪除",
      cancelButtonText: "取消",
    }).then((result) => {
      if (result.isConfirmed) {
        setModalStatus(false);
        setDelStatus(false);
        deleteDoc(doc(db, "events", id)).then(() => {
          setEventsData((prevData) =>
            prevData.filter((event) => event.id !== id)
          );
          Swal.fire({
            showConfirmButton: false,
            title: "刪除成功",
            text: "已刪除行程",
            icon: "success",
            timer: 1100,
          });
        });
      }
    });
  };

  const handleEdit = async () => {
    setModalStatus(false);
    setDelStatus(false);
    if (startDate >= endDate) {
      return alert("開始時間必須早於結束時間");
    }
    if (!eventInput) {
      return alert("請輸入活動名稱");
    }
    const eventDocRef = doc(db, "events", eventId);
    try {
      await updateDoc(eventDocRef, {
        start: startDate,
        end: endDate,
        title: eventInput,
        backgroundColor: tagList.length > 0 ? tagList[0].color : "rgba(29, 131, 220, 0.8)",
        tag: tagList ? tagList : [],
      });
      setEventsData((prevData) =>
        prevData.map((event) => {
          if (event.id === eventId) {
            return {
              ...event,
              start: startDate,
              end: endDate,
              title: eventInput,
              backgroundColor: tagList.length > 0 ? tagList[0].color : "rgba(29, 131, 220, 0.8)",
              tag: tagList ? tagList : [],
            };
          }
          return event;
        })
      );
    } catch (err) {
      console.error(err);
    }
  };
  
/*
  const handleEventDrop = async (event) => {
    const { id, start, end } = event;
  
    // 在这里可以调用更新事件的逻辑，例如使用Firebase进行数据更新
    try {
      const eventDocRef = doc(db, "events", id);
      await updateDoc(eventDocRef, {
        start,
        end,
      });
      setEventsData((prevData) =>
        prevData.map((ev) => {
          if (ev.id === id) {
            return {
              ...ev,
              start,
              end,
            };
          }
          return ev;
        })
      );
      console.log("Event dropped:", event);
    } catch (error) {
      console.error(error);
    }
  };  
*/
  return (
    <center className="Calendar">
      <div>
        <div className="py-4 border-bottom">
          <div className="form-title text-center">
            <h1>行事曆</h1>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                right: "0",
              }}
            >
              <input
                type="text"
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  getEvents(); 
                }}
                placeholder="以標籤或活動名稱搜尋"
              />
              <ColorSelectOption color={color} setColor={setColor} />
              <button 
                className="btn btn-primary1"
                onClick={() => {
                setColor("")
                getEvents();
              }}>重新設定顏色
              </button>
              <button
                className="btn btn-primary1"
                onClick={() =>
                  handleSlotSelectEvent({ start: today, end: tomorrow })
                }
              >
              <CalendarMonthIcon
                style={{
                marginTop: "-3px",
                marginRight: "3px",
                marginLeft: "-3px",
                }}
              />
                新增活動
              </button>
            </div>
          </div>
        </div>
        <br></br>
        <Calendar
          className="CalendarContainer"
          views={["day", "week", "month", "agenda"]}
          selectable = {true}
          locale="zh"
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={eventsData}
          style={{ height: "100%" }}
          eventPropGetter={(event) => ({
            style: {
              backgroundColor: event.backgroundColor,
            },
          })}
          onSelectEvent={handleOnSelectEvent}
          onSelectSlot={handleSlotSelectEvent}
          //onEventDrop={handleEventDrop}
        />
        <MyVerticallyCenteredModal
          modalStatus={modalStatus}
          handleClose={handleClose}
          startDate={startDate}
          endDate={endDate}
          eventInput={eventInput}
          setEventInput={setEventInput}
          handleSave={handleSave}
          delStatus={delStatus}
          handleDelete={() => {
            deletehandle(eventId);
          }}
          eventId={eventId}
          handleEdit={handleEdit}
          setEndDate={setEndDate}
          setStartDate={setStartDate}
          tagList={tagList}
          setTagList={setTagList}
        />
      </div>
    </center>
  );
}