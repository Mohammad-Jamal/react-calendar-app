import React, { memo, useContext, useState } from "react";
import { EventContext } from "../context/EventContext";
import styles from '../modules/Calendar.module.css'

const EventAccordion = () => {
  const { events } = useContext(EventContext);
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={styles.accordian_container}>
      {events.length > 0 ? (
        events.map((event, index) => (
          <div key={index} className={styles.accordianWrapper}>
            <button
              onClick={() => handleToggle(index)}
              
            >
              <div className={styles.accordianHeader}>
              <span>
                {event.title}
              </span>
              <span>{event.date}</span>
              </div>

              <svg
                className={`w-5 h-5 text-gray-500 transform ${
                  activeIndex === index ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {activeIndex === index && (
              <div className={styles.accordianBody}>
                <p>
                  <strong>Title:</strong> {event.title}
                </p>
                <p>
                  <strong>Category:</strong> {event.category}
                </p>
                <p>
                  <strong>Details:</strong> {event.details}
                </p>
              </div>
            )}
          </div>
        ))
      ) : (
        <p >No events found / Add Events</p>
      )}
    </div>
  );
};

export default memo(EventAccordion);
