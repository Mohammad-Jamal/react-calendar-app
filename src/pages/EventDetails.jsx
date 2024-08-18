import { useContext, useEffect, useState } from "react";
import { EventContext } from "../context/EventContext";
import { Link } from "react-router-dom";

const EventDetails = () => {
  const { events, deleteEvent, deleteAllEvent } = useContext(EventContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    localStorage.getItem("events");
  }, [events]);

  const filteredEvents = events.filter((event) => {
    return (
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory ? event.category === selectedCategory : true)
    );
  });

  if (events.length === 0)
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-black gap-4">
        <h1 className=" text-3xl sm:text-5xl text-green-300 font-bold uppercase">
          No Data Found
        </h1>
        <Link
          to="/"
          className="text-white text-xl sm:text-2xl bg-green-400 px-4 sm:px-5 py-3 sm:py-4 rounded-lg transition-all ease-linear hover:bg-green-300"
        >
          Home
        </Link>
      </div>
    );
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-black gap-10 p-4 sm:p-10 md:p-20">
      <h1 className="text-3xl sm:text-5xl text-green-300 font-bold uppercase text-center">
        Event Details
      </h1>
      {/* search input */}
      <input
        type="text"
        placeholder="Search Events.."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full sm:w-2/3 lg:w-1/2 px-4 py-2 sm:py-4 mb-4 text-lg sm:text-2xl text-gray-700 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-lg sm:placeholder:text-2xl shadow-sm transition-all duration-200"
      />
      {/* filter dropdown */}
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="w-full sm:w-1/2 lg:w-1/3 px-4 py-2 sm:py-4 mb-4 font-bold text-lg sm:text-2xl placeholder:font-bold placeholder:text-lg sm:placeholder:text-2xl text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-200"
      >
        <option value={""}>All categories</option>
        <option value={"Work"}>Work</option>
        <option value={"Family"}>Family</option>
        <option value={"Personal"}>Personal</option>
        <option value={"Other"}>Other</option>
      </select>
      <Link
        to="/"
        className= "text-white text-lg sm:text-2xl bg-green-400 transition-all ease-linear hover:bg-green-300 px-4 sm:px-5 py-3 sm:py-4 rounded-lg"
      >
        Home
      </Link>
      <div className="w-full max-w-full overflow-x-auto rounded-xl shadow-2xl flex flex-col gap-4 sm:gap-7 justify-center items-center bg-gray-500 border-green-100 border-2 backdrop-blur-sm p-4 sm:p-6">
        <table className="min-w-full table-auto shadow-lg">
          <thead className="rounded-md shadow-lg text-lg sm:text-2xl">
            <tr className="bg-black">
              <th className="p-4 sm:p-8 text-yellow-300 ">S.No</th>
              <th className="p-4 sm:p-8 text-yellow-300 ">Event Name</th>
              <th className="p-4 sm:p-8 text-yellow-300">Category</th>
              <th className="p-4 sm:p-8 text-yellow-300">Date</th>
              <th className="p-4 sm:p-8 text-yellow-300">Details</th>
              <th className="p-4 sm:p-8 text-yellow-300">Actions</th>
            </tr>
          </thead>
          <tbody className="text-lg sm:text-2xl">
            {filteredEvents.map((event, index) => (
              <tr
                key={index}
                className={`text-center ${
                  index % 2 === 0 ? "bg-[#12192c]" : "bg-[#002147]"
                }`}
              >
                <td className="p-4 sm:p-6 text-white">{index + 1}</td>
                <td className="p-4 sm:p-6 text-white">{event.title}</td>
                <td className="p-4 sm:p-6 text-white">{event.category}</td>
                <td className="p-4 sm:p-6 text-white">{event.date}</td>
                <td className="p-4 sm:p-6 text-white">{event.details}</td>
                <td className="p-4 sm:p-6 text-white">
                  <button
                    onClick={() => deleteEvent(index)}
                    className="bg-black border border-red-500 text-red-500 px-4 sm:px-8 py-2 sm:py-3 rounded-xl transition-all ease-linear hover:bg-red-600 hover:text-white hover:border-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={deleteAllEvent}
          className="bg-black border border-red-500 text-red-500 text-lg sm:text-2xl px-4 sm:px-8 py-2 sm:py-3 rounded-xl transition-all ease-linear hover:bg-red-600 hover:text-white hover:border-white"
        >
          Delete All
        </button>
      </div>
    </div>
  );
};

export default EventDetails;
