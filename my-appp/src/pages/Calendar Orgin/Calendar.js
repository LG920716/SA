import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { addDoc, getDocs } from "firebase/firestore";
import { eventsCollectionRef } from "../../firebase-config";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);
console.log();
export default function Calendars() {
  const [eventsData, setEventsData] = useState([]);

  const handleSelect = async ({ start, end }) => {
    const title = window.prompt("New Event name");
    if (!title) return;
    try {
      await addDoc(eventsCollectionRef, {
        start,
        end,
        title,
      });
      setEventsData([
        ...eventsData,
        {
          start,
          end,
          title,
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
      }))
    );
  };
  console.log(eventsData);
  useEffect(() => {
    getEvents();
  }, []);

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
        onSelectEvent={(event) => alert(event.start.toLocaleString("en-US"))}
        onSelectSlot={handleSelect}
      />
    </div>
  );
}
