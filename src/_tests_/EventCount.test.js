import { render } from "@testing-library/react";
import EventCount from "../components/EventCount";
import userEvent from "@testing-library/user-event";

describe("<EventCount /> component", () => {
  let EventCountComponent;

  beforeEach(() => {
    // eslint-disable-next-line
    EventCountComponent = render(
      <EventCount setCurrentNOE={() => {}} setErrorAlert={() => {}} />
    );
  });

  test("renders event count", () => {
    // eslint-disable-next-line
    const eventCountInput = EventCountComponent.queryByRole("textbox");

    expect(eventCountInput).toBeInTheDocument();
  });

  test("renders event with default value 32", () => {
    // eslint-disable-next-line
    const eventCountInput = EventCountComponent.queryByRole("textbox");

    expect(eventCountInput).toHaveValue("32");
  });

  test("value changes on type", async () => {
    // eslint-disable-next-line
    const eventCountInput = EventCountComponent.queryByRole("textbox");
    await userEvent.type(eventCountInput, "{backspace}{backspace}10");

    expect(eventCountInput).toHaveValue("10");
  });
});
