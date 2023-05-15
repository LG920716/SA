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
import AddIcon from "@mui/icons-material/Add";

moment.locale("zh-tw");
const localizer = momentLocalizer(moment);

export default function Calendars({ isAuth }) {
  const [eventsData, setEventsData] = useState([]);
  const [modalStatus, setModalStatus] = useState(false);
  const [eventInput, setEventInput] = useState("");

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const [startDate, setStartDate] = useState(new Date(today));
  const [endDate, setEndDate] = useState(new Date(tomorrow));
  const [eventId, setEventId] = useState("");
  const [delStatus, setDelStatus] = useState(false);
  const [backgroundColor, setbackgroundColor] = useState("red");

  let navigate = useNavigate();
  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);
  const handleSave = async () => {
    setModalStatus(false);
    if (!eventInput) {
      return alert("請輸入title");
    }
    try {
      await addDoc(eventsCollectionRef, {
        start: startDate,
        end: endDate,
        title: eventInput,
        backgroundColor: backgroundColor,
      });
      setEventsData([
        ...eventsData,
        {
          start: startDate,
          end: endDate,
          title: eventInput,
          backgroundColor: backgroundColor,
        },
      ]);
    } catch (err) {
      console.error(err);
    }
  };
  const getEvents = async () => {
    const data = await getDocs(eventsCollectionRef);
    console.log(data);
    setEventsData(
      data.docs.map((doc) => ({
        start: doc.data().start.toDate(),
        end: doc.data().end.toDate(),
        title: doc.data().title,
        id: doc.id,
        backgroundColor: doc.data().backgroundColor,
      }))
    );
  };

  console.log("eventId", eventId);
  console.log("title", eventInput);
  console.log("startDate", startDate);
  console.log("endDate", endDate);
  console.log(endDate > startDate);
  console.log("backgroundColor", backgroundColor);
  useEffect(() => {
    getEvents();
  }, []);
  const handleClose = () => {
    setModalStatus(false);
    setDelStatus(false);
  };
  const handleSlotSelectEvent = (slotInfo) => {
    setStartDate(slotInfo.start);
    setEndDate(slotInfo.end);
    setbackgroundColor(slotInfo.backgroundColor);
    setModalStatus(true);
    setEventInput("");
  };
  const hanldeOnSelectEvent = (e) => {
    setDelStatus(true);
    setStartDate(e.start);
    setEndDate(e.end);
    setEventInput(e.title);
    setbackgroundColor(e.backgroundColor);
    setEventId(e.id);
    setModalStatus(true);
  };
  // const handleDelete = async () => {
  //   setModalStatus(false);
  //   setDelStatus(false);
  //   const eventDocRef = doc(db, "events", eventId);
  //   try {
  //     await deleteDoc(eventDocRef);
  //     getEvents();
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  const deletehandle = (id) => {
    Swal.fire({
      title: "確定刪除?",
      text: `確定刪除此行程`,
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
        const del = async () => {
          await deleteDoc(doc(db, "events", id));
        };
        del();
        Swal.fire({
          showConfirmButton: false,
          title: "刪除成功",
          text: `已刪除行程`,
          icon: "success",
          timer: 1100,
        });
      }
    });
  };
  const handleEdit = async () => {
    setModalStatus(false);
    setDelStatus(false);
    const eventDocRef = doc(db, "events", eventId);
    try {
      await updateDoc(eventDocRef, {
        start: startDate,
        end: endDate,
        title: eventInput,
        backgroundColor: backgroundColor,
      });
      getEvents();
    } catch (err) {
      console.error(err);
    }
  };

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
                className="btn btn-primary1"
                type="button"
                value="新增活動 "
                onClick={() =>
                  handleSlotSelectEvent({ start: today, end: tomorrow })
                }
              />
            </div>
          </div>
        </div>
        <br></br>
        <Calendar
          views={["day", "week", "month", "agenda"]}
          selectable
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
          onSelectEvent={hanldeOnSelectEvent}
          onSelectSlot={handleSlotSelectEvent}
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
          backgroundColor={backgroundColor}
          setbackgroundColor={setbackgroundColor}
        />
      </div>
    </center>
  );
}
