Feature: Show/hide events details
 Scenario: When user searches for a city, when user clicks show details, a new components renders.
  Given the user has searched for a chosen a city from the list
  When the user clicks on show details button
  Then a new component should render displaying more information on that event

 Scenario: When the user clicks the hide details button the component disappears
  Given the user has clicked show more details and the event component is open
  When the user clicks on hide details button
  Then the mainpage should re-render











