import { loadFeature, defineFeature } from "jest-cucumber";
import { render, within, waitFor } from "@testing-library/react";
import App from "../App";
import { getEvents } from "../api.js";
import userEvent from "@testing-library/user-event";

const feature = loadFeature("./src/features/showHideAnEventsDetails.feature");

defineFeature(feature, (test) => {
  test("When user searches for a city, when user clicks show details, a new components renders.", ({
    given,
    when,
    then,
  }) => {
    let AppComponent;
    let AppDOM;
    let CitySearchDOM;
    let citySearchInput;
    given(
      "the user has searched for a chosen a city from the list",
      async () => {
        AppComponent = render(<App />);
        const user = userEvent.setup();
        // eslint-disable-next-line
        AppDOM = AppComponent.container.firstChild;
        // eslint-disable-next-line
        CitySearchDOM = AppDOM.querySelector("#city-search");
        citySearchInput = within(CitySearchDOM).queryByRole("textbox");
        await user.type(citySearchInput, "Berlin");
      }
    );

    when("the user clicks on show details button", async () => {
      const user = userEvent.setup();
      // eslint-disable-next-line
      const button = AppDOM.querySelector(".details-btn");
      await user.click(button);
    });

    then(
      "a new component should render displaying more information on that event",
      () => {
        // eslint-disable-next-line
        const button = AppDOM.querySelector(".details-btn");
        expect(button.textContent).toBe("Hide Details");
      }
    );
  });

  test("When the user clicks the hide details button the component disappears", ({
    given,
    when,
    then,
  }) => {
    let AppComponent;
    let AppDOM;

    given(
      "the user has clicked show more details and the event component is open",
      async () => {
        AppComponent = render(<App />);
        // eslint-disable-next-line
        AppDOM = AppComponent.container.firstChild;
        const user = userEvent.setup();
        // eslint-disable-next-line
        const button = AppDOM.querySelector(".details-btn");
        await user.click(button);
      }
    );

    when("the user clicks on hide details button", async () => {
      AppComponent = render(<App />);
      // eslint-disable-next-line
      AppDOM = AppComponent.container.firstChild;
      // eslint-disable-next-line
      const button = AppDOM.querySelector(".details-btn");
      const user = userEvent.setup();
      await user.click(button);
    });

    then("the mainpage should re-render", async () => {
      // eslint-disable-next-line
      const AppDOM = AppComponent.container.firstChild;
      // eslint-disable-next-line
      const EventListDOM = AppDOM.querySelector("#event-list");

      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole("listitem");
        expect(EventListItems.length).toBe(32);
      });
    });
  });
});
