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

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const [startDate, setStartDate] = useState(new Date(today));
  const [endDate, setEndDate] = useState(new Date(tomorrow));
  const [eventId, setEventId] = useState("");
  const [delStatus, setDelStatus] = useState(false);
  const [tag, settag] = useState("1");

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
        tag: tag,
      });
      setEventsData([
        ...eventsData,
        {
          start: startDate,
          end: endDate,
          title: eventInput,
          tag: tag,
          backgroundColor: (() => {
            switch (tag) {
              case "1":
                return "#78ABCA";
              case "2":
                return "#B986D5";
              case "3":
                return "#F5A63B";
              default:
                return "#16cb93";
            }
          })(),
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
        tag: doc.data().tag,
        id: doc.id,
        backgroundColor: (() => {
          switch (doc.data().tag) {
            case "1":
              return "#78ABCA";
            case "2":
              return "#B986D5";
            case "3":
              return "#F5A63B";
            default:
              return "#16cb93";
          }
        })(),
      }))
    );
  };

  console.log("eventId", eventId);
  console.log("title", eventInput);
  console.log("startDate", startDate);
  console.log("endDate", endDate);
  console.log(endDate > startDate);
  console.log("tag", tag);
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
    settag(slotInfo.tag);
    setModalStatus(true);
    setEventInput("");
  };
  const hanldeOnSelectEvent = (e) => {
    setDelStatus(true);
    setStartDate(e.start);
    setEndDate(e.end);
    setEventInput(e.title);
    settag(e.tag);
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
        start: startDate,
        end: endDate,
        title: eventInput,
        tag: tag,
        backgroundColor: (() => {
          switch (tag) {
            case "1":
              return "#78ABCA";
            case "2":
              return "#B986D5";
            case "3":
              return "#F5A63B";
            default:
              return "#16cb93";
          }
        })(),
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
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() =>
                handleSlotSelectEvent({ start: today, end: tomorrow })
              }
            >
              新增活動
            </button>
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
          handleDelete={handleDelete}
          eventId={eventId}
          handleEdit={handleEdit}
          setEndDate={setEndDate}
          setStartDate={setStartDate}
          tag={tag}
          settag={settag}
        />
      </div>
    </center>
  );
}
