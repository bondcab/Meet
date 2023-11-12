import { useState } from "react";

function EventCount() {
  const [valueInput, setValueInput] = useState(32);

  function handleOnChange(event) {
    setValueInput(event.target.value);
  }

  return (
    <input id="event-count" value={valueInput} onChange={handleOnChange} />
  );
}

export default EventCount;
