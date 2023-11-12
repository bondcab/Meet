import "./App.css";
import EventList from "./components/EventList";
import CitySearch from "./components/CitySearch";
import EventCount from "./components/EventCount";
import { useEffect, useState } from "react";
import { getEvents } from "./api";

function App() {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);

  const fetchData = async () => {
    const allEvents = await getEvents();
    setEvents(allEvents.slice(0, currentNOE));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <CitySearch />
      <EventList events={events} />
      <EventCount />
    </div>
  );
}

export default App;
