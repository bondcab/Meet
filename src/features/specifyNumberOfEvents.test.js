import { loadFeature, defineFeature } from "jest-cucumber";
import { render, within, waitFor } from "@testing-library/react";
import App from "../App";
import { getEvents } from "../api.js";
import userEvent from "@testing-library/user-event";

const feature = loadFeature("./src/features/specifyNumberOfEvents.feature");

defineFeature(feature, (test) => {
  test("User searches for a city and clicks on it an option to specicy number of events should appear", ({
    given,
    when,
    then,
  }) => {
    let AppComponent;
    let AppDOM;
    let CitySearchDOM;
    let citySearchInput;
    given(
      "the user has searched for a chosen a city on the mainpage",
      async () => {
        AppComponent = render(<App />);
        const user = userEvent.setup();
        // eslint-disable-next-line
        AppDOM = AppComponent.container.firstChild;
        // eslint-disable-next-line
        CitySearchDOM = AppDOM.querySelector("#city-search");
        citySearchInput = within(CitySearchDOM).queryByRole("textbox");
        await user.type(citySearchInput, "Berlin");
        // eslint-disable-next-line
      }
    );

    when("the user clicks on that city", async () => {
      const user = userEvent.setup();
      // eslint-disable-next-line
      const suggestions = AppDOM.querySelector(".suggestions");
      // eslint-disable-next-line
      await user.click(suggestions);
    });

    then(
      "a new option should appear allowing them to specify the number of events they want to see",
      () => {
        // eslint-disable-next-line
        const eventCountInput = AppDOM.querySelector("#event-count");

        expect(eventCountInput).toBeInTheDocument();
      }
    );
  });

  test("User sets number of events they want to see, mainpage rerenders with that number of events", ({
    given,
    when,
    then,
  }) => {
    let AppComponent;
    let AppDOM;
    let eventCountDOM;

    given("the user now has the option to set number of events", () => {});

    when("the user sets number of events they want to see", async () => {
      AppComponent = render(<App />);
      // eslint-disable-next-line
      AppDOM = AppComponent.container;
      const user = userEvent.setup();
      // eslint-disable-next-line
      eventCountDOM = AppDOM.querySelector("#event-count");
      await waitFor(() => {
        const eventCountInput = within(eventCountDOM).queryByRole("textbox");
        user.type(eventCountInput, "{backspace}{backspace}10");
      });
    });

    then(
      "main page shoud re-render showing this number of events",
      async () => {
        await waitFor(() => {
          // eslint-disable-next-line
          const EventListDOM = AppDOM.querySelector("#event-list");
          // eslint-disable-next-line
          // eslint-disable-next-line
          const EventListItems =
            within(EventListDOM).queryAllByRole("listitem");
          // eslint-disable-next-line
          expect(EventListItems.length).toBe(10);
        });
      }
    );
  });

  test("User hasnt set a number of events so they should see all for that city", ({
    given,
    when,
    then,
  }) => {
    let AppComponent;
    let AppDOM;
    let eventCountDOM;
    given("the user now has the option to set number of events", () => {
      AppComponent = render(<App />);
    });

    when("the user doesnt set the number of events", () => {});

    then("main page show all events for that city", async () => {
      AppDOM = AppComponent.container;
      // eslint-disable-next-line
      eventCountDOM = AppDOM.querySelector("#event-count");
      // eslint-disable-next-line
      const eventCountInput = within(eventCountDOM).queryByRole("textbox");
      // eslint-disable-next-line
      expect(eventCountInput).toHaveValue("32");
    });
  });
});
