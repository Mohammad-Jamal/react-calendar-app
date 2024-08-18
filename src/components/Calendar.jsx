import React, { useContext, useEffect, useState } from "react";
import styles from "../modules/Calendar.module.css";
import { EventContext } from "../context/EventContext";

const Calendar = () => {
  // state management
  const { events, setEvents, addEvent } = useContext(EventContext);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    details: "",
  });

  const weeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [changed, setChanged] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);

  // State to hold current month and year
  const [currentDate, setCurrentDate] = useState(new Date());

  // state to only display the popup event form when the user clicks on any day
  const [clickEvent, setClickEvent] = useState(false);

  // Get the month, year, and number of days in the current month
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  // calculate the no.of days in the current month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // get the day of the week the month starts on
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  //creating an array for days with empty slots for the days before the first day of the month starts
  const daysArray = [
    ...Array(firstDayOfMonth).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const today = new Date();
  const todayDate = today.getDate();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();

  useEffect(() => {
    if (month === todayMonth && year === todayYear) {
      setChanged(false);
    } else {
      setChanged(true);
    }
  }, [currentDate, todayMonth, todayYear]);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handlePrevYear = () => {
    setCurrentDate(new Date(year - 1, month, 1));
  };

  const handleNextYear = () => {
    setCurrentDate(new Date(year + 1, month, 1));
  };

  // to create a new event and edit the event when the user clicks on the day
  const handleClickEvent = (day) => {
    const eventToEdit = events.find(
      (event) =>
        parseInt(event.date.split(" ")[0], 10) === day &&
        event.date.includes(eventMon) &&
        event.date.includes(year)
    );

    // console.log(eventToEdit);

    if (eventToEdit) {
      setFormData({
        title: eventToEdit.title,
        category: eventToEdit.category,
        details: eventToEdit.details,
      });
    } else {
      setFormData({
        title: "",
        category: "",
        details: "",
      });
    }
    setSelectedDay(day);
    setClickEvent(true);
  };

  const handleCloseForm = () => {
    // console.log("Closing form"); // Debugging statement
    setClickEvent(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingEventIndex = events.findIndex(
      (event) =>
        parseInt(event.date.split(" ")[0]) === selectedDay &&
        event.date.includes(eventMon) &&
        event.date.includes(year)
    );
    const updatedEvent = {
      ...formData,
      date: `${selectedDay} ${currentDate.toLocaleString("default", {
        month: "long",
      })} ${year}`,
    };

    if (existingEventIndex >= 0) {
      // update the existing event
      const updatedEvents = [...events];
      updatedEvents[existingEventIndex] = updatedEvent;
      setEvents(updatedEvents);
    } else {
      // add new event
      addEvent(updatedEvent);
    }

    setFormData({
      title: "",
      category: "",
      details: "",
    });

    setClickEvent(false);
    handleCloseForm();
  };

  const eventMon = currentDate.toLocaleString("default", { month: "long" });

  return (
    <>
      <div className={styles[`main-calender`]}>
        {/*  this is the event form that should popup when the user clicks on a day to create an event or edit the event */}
        <div
          className={clickEvent ? styles.event_form : styles.event_form_hidden}
        >
          <form onSubmit={handleSubmit}>
            <h3>
              {`${
                events.some(
                  (event) =>
                    parseInt(event.date.split(" ")[0], 10) === selectedDay &&
                    event.date.includes(eventMon) &&
                    event.date.includes(year)
                )
                  ? "Edit Event for"
                  : "Create Event for"
              } ${selectedDay} ${currentDate.toLocaleString("default", {
                month: "long",
              })} ${year}`}
            </h3>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter Event Title"
              required
            />
            {/* <input type="text" placeholder="Category" /> */}
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="Work">Work</option>
              <option value="Family">Family</option>
              <option value="Personal">Personal</option>
              <option value="Other">Other</option>
            </select>
            <textarea
              name="details"
              value={formData.details}
              onChange={handleChange}
              placeholder="Enter Event Details"
              required
            ></textarea>
            <button type="submit">Save</button>
            <button type="button" onClick={handleCloseForm}>
              Cancel
            </button>
          </form>
        </div>

        {/* month,year part */}
        <div className={styles.calender_top}>
          <div className={styles.top_left}>
            <button onClick={handlePrevYear}>{"<<"}</button>
            <button onClick={handlePrevMonth}>{"<"}</button>
          </div>
          <div className={styles.month_year}>
            <p>
              {currentDate
                .toLocaleString("default", { month: "long" })
                .toUpperCase()}{" "}
              {year}
            </p>
          </div>
          <div className={styles.top_left}>
            <button onClick={handleNextMonth}>{">"}</button>
            <button onClick={handleNextYear}>{">>"}</button>
          </div>
        </div>
        {/* weeks part */}
        <div className={styles.weeks}>
          <ul>
            {weeks.map((week) => {
              return <li key={week}>{week}</li>;
            })}
          </ul>
        </div>

        {/* days part */}
        <div className={styles.days_part}>
          <ul>
            {daysArray.map((day, index) => (
              <li
                key={index}
                className={`${day ? styles.day : styles.empty} ${
                  day === todayDate && !changed ? styles.currentDay : ""
                }
              ${
                day &&
                events.some(
                  (event) =>
                    parseInt(event.date.split(" ")[0], 10) === day &&
                    event.date.includes(eventMon) &&
                    event.date.includes(year)
                )
                  ? styles.existed_event
                  : ""
              }
              `}
                onClick={() => day && handleClickEvent(day)}
              >
                {day}
                <span
                  className={`${
                    day === todayDate && !changed ? styles.today : ""
                  }`}
                >
                  Today
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

    </>
  );
};

export default Calendar;


