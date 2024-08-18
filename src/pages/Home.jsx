import styles from "../modules/Calendar.module.css";
import { Link } from "react-router-dom";
import EventAccordion from "../components/EventAccordian";
import Calendar from "../components/Calendar";

const Home = () => {
  return (
    <>
      <div className={styles.container}>
        <h1>Calendar Application</h1>
        <Link
          to="/event-details"
          className="text-white text-2xl bg-green-400 transition-all ease-linear hover:bg-green-300 px-5 py-4 rounded-lg"
        >
          Event Details
        </Link>
        <marquee className="text-xl w-1/5 text-pink-300 sm:mb-0 absolute top-56 font-semibold opacity-95 " value = '2' direction='left' >Tap on any Day to Add Events or Update Events </marquee>
        <div className={styles.container2}>
        <Calendar />
        <EventAccordion />
        </div>
        
      </div>
    </>
  );
};
export default Home;
