import { useState } from "react";

function Event({ event }) {
  const { summary, created, location, htmlLink, description } = event;
  const [hidden, setHidden] = useState(true);

  function handleOnClick() {
    setHidden(!hidden);
  }

  return (
    <div>
      <li className="eventCard">
        <h3 className="eventTitle">{summary}</h3>
        <p>{created}</p>
        <p>{location}</p>
        {hidden ? null : (
          <div>
            <h4>About event:</h4>
            <a href={htmlLink}>See details on Google calendar</a>
            <p>{description}</p>
          </div>
        )}

        <button onClick={handleOnClick}>
          {hidden ? "Show Details" : "Hide Details"}
        </button>
      </li>
    </div>
  );
}

export default Event;
