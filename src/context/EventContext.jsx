import { createContext, useEffect, useState } from "react";

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState(() => {
    const localData = localStorage.getItem("events");
    return localData ? JSON.parse(localData) : [];
  });



  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events"));
    if (storedEvents) {
      setEvents(storedEvents);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const addEvent = (newEvent) => {
    setEvents((prevEvents) => {
      const updatedEvents = [...prevEvents, newEvent];

      // console.log('Adding event:', updatedEvents); // Debugging
      localStorage.setItem("events", JSON.stringify(updatedEvents)); // Save updated events
      return updatedEvents;
    });
    
  };

  const deleteEvent = (index) => {
    setEvents((prevEvents) => {
      const updatedEvents = prevEvents.filter((_, i) => i !== index);
      localStorage.setItem('events', JSON.stringify(updatedEvents)); // Save updated events
      return updatedEvents;
    });
  };
  
  const deleteAllEvent = () => {
    setEvents([]);
    localStorage.removeItem('events'); // Clear localStorage
  };

  return (
    <EventContext.Provider
      value={{ events, setEvents, addEvent,deleteEvent, deleteAllEvent }}
    >
      {children}
    </EventContext.Provider>
  );
};
