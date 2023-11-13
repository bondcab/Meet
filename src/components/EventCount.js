import { useState } from "react";

function EventCount({ setCurrentNOE, currentNOE }) {
  const [valueInput, setValueInput] = useState(32);

  function handleOnChange(event) {
    setValueInput(event.target.value);
    setCurrentNOE(event.target.value);
  }
  console.log("EventCount.js currentNOE: ", currentNOE);
  return (
    <input id="event-count" value={valueInput} onChange={handleOnChange} />
  );
}

export default EventCount;
