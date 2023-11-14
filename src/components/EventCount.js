import { useState } from "react";

function EventCount({ setCurrentNOE, currentNOE }) {
  const [valueInput, setValueInput] = useState(32);

  function handleOnChange(event) {
    setValueInput(event.target.value);
    if (event.target.value === "") {
      setCurrentNOE(32);
    } else {
      setCurrentNOE(event.target.value);
    }
  }

  return (
    <input id="event-count" value={valueInput} onChange={handleOnChange} />
  );
}

export default EventCount;
