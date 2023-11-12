import { render } from "@testing-library/react";
import App from "../App";

describe("<App /> component", () => {
  let AppDOM;
  beforeEach(() => {
    // eslint-disable-next-line
    AppDOM = render(<App />).container.firstChild;
  });

  test("renders list of events", () => {
    // eslint-disable-next-line
    expect(AppDOM.querySelector("#event-list")).toBeInTheDocument();
  });

  test("render CitySearch", () => {
    // eslint-disable-next-line
    expect(AppDOM.querySelector("#city-search")).toBeInTheDocument();
  });

  test("render EventCount", () => {
    // eslint-disable-next-line
    expect(AppDOM.querySelector("#event-count")).toBeInTheDocument();
  });
});
