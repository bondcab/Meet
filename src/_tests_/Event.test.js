import { render } from "@testing-library/react";
import Event from "../components/Event";

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
});
