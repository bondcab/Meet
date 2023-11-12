import { render, within, waitFor } from "@testing-library/react";
import EventList from "../components/EventList";
import { getEvents } from "../api";
import App from "../App";

describe("<EventList /> component", () => {
  let EventListComponent;
  beforeEach(() => {
    // eslint-disable-next-line
    EventListComponent = render(<EventList />);
  });

  test('has an element with "list" role', () => {
    // eslint-disable-next-line
    expect(EventListComponent.queryByRole("list")).toBeInTheDocument();
  });

  test("renders correct number of events", async () => {
    const allEvents = await getEvents();
    EventListComponent.rerender(<EventList events={allEvents} />);
    // eslint-disable-next-line
    expect(EventListComponent.getAllByRole("listitem")).toHaveLength(
      allEvents.length
    );
  });
});

describe("<EventList /> integration", () => {
  test("renders a list of 32 events when the app is mounted and rendered", async () => {
    // eslint-disable-next-line
    const AppComponent = render(<App />);
    // eslint-disable-next-line
    const AppDOM = AppComponent.container.firstChild;
    // eslint-disable-next-line
    const EventListDOM = AppDOM.querySelector("#event-list");
    // eslint-disable-next-line
    await waitFor(() => {
      // eslint-disable-next-line
      const EventListItems = within(EventListDOM).queryAllByRole("listitem");
      // eslint-disable-next-line
      expect(EventListItems.length).toBe(32);
    });
  });
});
