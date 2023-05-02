import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { eventsCollectionRef, db } from "../../firebase-config";
import MyVerticallyCenteredModal from "./pop";
import { useNavigate } from "react-router-dom";
import "./Calendar.css";


moment.locale("zh-tw");
const localizer = momentLocalizer(moment);

export default function Calendars({ isAuth }) {
  const [eventsData, setEventsData] = useState([]);
  const [modalStatus, setModalStatus] = useState(false);
  const [eventInput, setEventInput] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  //state for on select event
  const [eventId, setEventId] = useState("");
  const [delStatus, setDelStatus] = useState(false);

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
      });
      setEventsData([
        ...eventsData,
        {
          start: startDate,
          end: endDate,
          title: eventInput,
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
      }))
    );
  };
  console.log("eventId", eventId);
  console.log("title", eventInput);
  console.log("startDate", startDate);
  console.log("endDate", endDate);
  console.log(endDate > startDate);
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
    setModalStatus(true);
    setEventInput("");
  };
  const hanldeOnSelectEvent = (e) => {
    setDelStatus(true);
    setStartDate(e.start);
    setEndDate(e.end);
    setEventInput(e.title);
    setEventId(e.id);
    setModalStatus(true);
  };
  const handleDelete = async () => {
    setModalStatus(false);
    setDelStatus(false);
    const eventDocRef = doc(db, "events", eventId);
    try {
      await deleteDoc(eventDocRef);
      getEvents();
    } catch (err) {
      console.error(err);
    }
  };
  const handleEdit = async () => {
    setModalStatus(false);
    setDelStatus(false);
    const eventDocRef = doc(db, "events", eventId);
    try {
      await updateDoc(eventDocRef, {
        start: startDate.toDate(),
        end: endDate.toDate(),
        title: eventInput,
      });
      getEvents();
    } catch (err) {
      console.error(err);
    }
  };

  return (
   <center className="Calendar">
     <div >
      <div className="py-4 border-bottom">
        <div className="form-title text-center">
      <h1>行事曆</h1>
      </div>
      </div><br></br>
      <Calendar
        views={["day", "week", "month", "agenda"]}
        selectable
        locale="zh"
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={eventsData}
        style={{ height: "100%" }}
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
        handleDelete={handleDelete}
        eventId={eventId}
        handleEdit={handleEdit}
        setEndDate={setEndDate}
        setStartDate={setStartDate}
      />
    </div>
   </center>
  );
}