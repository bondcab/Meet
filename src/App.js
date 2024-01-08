import "./App.css";
import EventList from "./components/EventList";
import CitySearch from "./components/CitySearch";
import EventCount from "./components/EventCount";
import { useEffect, useState } from "react";
import { getEvents, extractLocations } from "./api";
import { InfoAlert, ErrorAlert, WarningAlert } from "./components/Alert";
import CityEventsChart from "./components/CityEventsChart";
import EventGenresChart from "./components/EventGenresChart";

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [warningAlert, setWarningAlert] = useState("");
  let warningText;

  useEffect(() => {
    if (navigator.onLine) {
      warningText = "";
      setWarningAlert(warningText);
    } else {
      warningText =
        "You are offline. Events data will be limited to local cache";
      setWarningAlert(warningText);
    }

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
  };

  return (
    <div className="App">
      {/* <div className="banner">
        <h1 className="heading">Meet</h1>
      </div> */}

      <div className="alerts-container">
        {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
        {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
        {warningAlert.length ? <WarningAlert text={warningAlert} /> : null}
      </div>
      <div className="searchCountContainer">
        <img
          src="https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="hot air balloons"
          className="balloons"
        />

        <div className="searchContainers">
          <CitySearch
            allLocations={allLocations}
            setCurrentCity={setCurrentCity}
            setInfoAlert={setInfoAlert}
          />
          <EventCount
            setCurrentNOE={setCurrentNOE}
            currentNOE={currentNOE}
            setErrorAlert={setErrorAlert}
          />
        </div>
      </div>

      <div className="charts-container">
        <EventGenresChart events={events} />
        <CityEventsChart allLocations={allLocations} events={events} />
      </div>

      <EventList events={events} />
    </div>
  );
};

export default App;
