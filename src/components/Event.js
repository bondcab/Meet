function Event({ event }) {
  const { summary, created, location } = event;
  return (
    <div>
      <li className="eventCard">
        <h3 className="eventTitle">{summary}</h3>
        <p>{created}</p>
        <p>{location}</p>
        <button>Show Details</button>
      </li>
      ;
    </div>
  );
}

export default Event;
