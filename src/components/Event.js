import { useState } from "react";

function Event({ event }) {
  const { summary, location, htmlLink, description } = event;
  const [hidden, setHidden] = useState(true);
  const date = event.created;
  const dateShort = date.slice(0, 10);
  const time = date.slice(14, 19);

  function handleOnClick() {
    setHidden(!hidden);
  }

  return (
    <div className="eventListItem">
      <li className="eventCard">
        <h3 className="eventTitle">{summary}</h3>
        <p>{dateShort}</p>
        <p>{location}</p>

        {hidden ? null : (
          <div>
            <h4>About event:</h4>
            <a href={htmlLink}>See details on Google calendar</a>
            <p>{description}</p>
          </div>
        )}

        <button onClick={handleOnClick} className="details-btn">
          {hidden ? "Show Details" : "Hide Details"}
        </button>
      </li>
    </div>
  );
}

export default Event;
