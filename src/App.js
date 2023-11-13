import "./App.css";
import EventList from "./components/EventList";
import CitySearch from "./components/CitySearch";
import EventCount from "./components/EventCount";
import { useEffect, useState } from "react";
import { getEvents, extractLocations } from "./api";

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");

  useEffect(() => {
    fetchData();
  }, [currentCity, currentNOE]);

  const fetchData = async () => {
    const allEvents = await getEvents();
    const filteredEvents =
      currentCity === "See all cities"
        ? allEvents
        : allEvents.filter((event) => event.location === currentCity);
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
    console.log("App.js currentNOE: ", currentNOE);
  };

  return (
    <div className="App">
      <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} />
      <EventList events={events} />
      <EventCount setCurrentNOE={setCurrentNOE} currentNOE={currentNOE} />
    </div>
  );
};

export default App;
