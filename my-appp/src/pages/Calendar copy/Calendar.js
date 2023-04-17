import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { addDoc, getDocs } from "firebase/firestore";
import { eventsCollectionRef } from "../../firebase-config";
import MyVerticallyCenteredModal from "./pop";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

export default function Calendars() {
  const [eventsData, setEventsData] = useState([]);
  const [modalStatus, setModalStatus] = useState(false);
  const [eventInput, setEventInput] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  //state for on select event
  const [eventId, setEventId] = useState("");
  const [editStatus, setEditStatus] = useState(false);

  const handleSave = async () => {
    setModalStatus(false);
    if (!eventInput) {
      return alert("請輸入title");
    }
    try {
      await addDoc(eventsCollectionRef, {
        start: moment(startDate, moment.defaultFormat).toDate(),
        end: moment(endDate, moment.defaultFormat).toDate(),
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
  console.log("eventsData", eventsData);
  console.log("title", eventInput);
  console.log("startDate", startDate);
  console.log("endDate", endDate);
  console.log(endDate > startDate);
  useEffect(() => {
    getEvents();
  }, []);
  const handleClose = () => setModalStatus(false);
  const handleSlotSelectEvent = (slotInfo) => {
    setStartDate(moment(slotInfo.start).format("YYYY-MM-DDTHH:MM"));
    setEndDate(moment(slotInfo.end).format("YYYY-MM-DDTHH:MM"));
    setModalStatus(true);
    setEventInput("");
  };
  // console.log(startDate);
  return (
    <div className="App">
      <Calendar
        views={["day", "week", "month", "agenda"]}
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={eventsData}
        style={{ height: "100vh" }}
        onSelectEvent={() => alert("123")}
        onSelectSlot={handleSlotSelectEvent}
      />
      <MyVerticallyCenteredModal
        modalStatus={modalStatus}
        handleClose={handleClose}
        startDate={startDate}
        endDate={endDate}
        eventInput={eventInput}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        setEventInput={setEventInput}
        handleSave={handleSave}
        editStatus={editStatus}
        // handleDelete={handleDelete}
      />
    </div>
  );
}
