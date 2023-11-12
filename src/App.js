import "./App.css";
import EventList from "./components/EventList";
import CitySearch from "./components/CitySearch";
import EventCount from "./components/EventCount";

function App() {
  return (
    <div className="App">
      <CitySearch />
      <EventList />
      <EventCount />
    </div>
  );
}

export default App;
