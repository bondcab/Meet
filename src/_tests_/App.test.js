import { render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getEvents } from "../api";
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

describe("<App /> integration", () => {
  test("renders a list of events matching the city selected by the users", async () => {
    const user = userEvent.setup();
    // eslint-disable-next-line
    const AppComponent = render(<App />);
    // eslint-disable-next-line
    const AppDOM = AppComponent.container.firstChild;
    // eslint-disable-next-line
    const CitySearchDOM = AppDOM.querySelector("#city-search");
    const CitySearchInput = within(CitySearchDOM).queryByRole("textbox");

    await user.type(CitySearchInput, "Berlin");
    const berlinSuggestionItem =
      within(CitySearchDOM).queryByText("Berlin, Germany");
    await user.click(berlinSuggestionItem);
    // eslint-disable-next-line
    const EventListDOM = AppDOM.querySelector("#event-list");
    const allRenderedEventItems =
      within(EventListDOM).queryAllByRole("listitem");

    const allEvents = await getEvents();
    const berlinEvents = allEvents.filter(
      (event) => event.location === "Berlin, Germany"
    );

    expect(allRenderedEventItems.length).toBe(berlinEvents.length);

    allRenderedEventItems.forEach((event) => {
      expect(event.textContent).toContain("Berlin, Germany");
    });
  });

  test("Renders number of events specified by the user", async () => {
    // eslint-disable-next-line
    const AppComponent = render(<App />);
    // eslint-disable-next-line
    const AppDOM = AppComponent.container.firstChild;
    // eslint-disable-next-line
    const NumberOfEventsDOM = AppDOM.querySelector("#event-count");

    await userEvent.type(NumberOfEventsDOM, "{backspace}{backspace}10");
    // eslint-disable-next-line
    const EventListDOM = AppDOM.querySelector("#event-list");
    const allRenderedEventItems =
      within(EventListDOM).queryAllByRole("listitem");
    expect(allRenderedEventItems.length).toEqual(10);
  });
});
