import { render } from "@testing-library/react";
import Event from "../components/Event";
import user from "@testing-library/user-event";

describe("<Event /> component", () => {
  let EventComponent;
  const MockData = {
    summary: "Learn JavaScript",
    created: "2020-05-19",
    location: "London, UK",
  };

  beforeEach(() => {
    // eslint-disable-next-line
    EventComponent = render(<Event event={MockData} />);
  });

  test("renders event details", () => {
    // eslint-disable-next-line
    const eventTitle = EventComponent.queryByText("Learn JavaScript");
    // eslint-disable-next-line
    const eventTime = EventComponent.queryByText("2020-05-19");
    // eslint-disable-next-line
    const eventLocation = EventComponent.queryByText("London, UK");

    expect(eventTitle).toBeInTheDocument();
    expect(eventTime).toBeInTheDocument();
    expect(eventLocation).toBeInTheDocument();
  });

  test("renders event details button with the title (show details)", () => {
    // eslint-disable-next-line
    const button = EventComponent.queryByText("Show Details");

    expect(button).toBeInTheDocument();
  });

  test("by default, events details section should be hidden", () => {
    // eslint-disable-next-line
    const eventDetails = EventComponent.queryByText("About event");

    expect(eventDetails).not.toBeInTheDocument();
  });

  test("shows the event details section when user clicks on the 'show details' button", async () => {
    // eslint-disable-next-line
    const button = EventComponent.queryByText("Show Details");
    await user.click(button);
    // eslint-disable-next-line
    const eventDetails = EventComponent.queryByText("About event:");
    expect(button.textContent).toBe("Hide Details");

    expect(eventDetails).toBeInTheDocument();
  });

  test("hides the details section when the user clicks on the 'hide details' button", async () => {
    // eslint-disable-next-line
    const button = EventComponent.queryByText("Show Details");
    await user.click(button);
    await user.click(button);
    // eslint-disable-next-line
    const eventDetails = EventComponent.queryByText("About event:");
    expect(eventDetails).not.toBeInTheDocument();
  });
});
