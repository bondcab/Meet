Feature: Filter events by city
 Scenario: User searches for a city and clicks on it an option to specicy number of events should appear 
  Given the user has searched for a chosen a city on the mainpage
  When the user clicks on that city
  Then a new option should appear allowing them to specify the number of events they want to see

 Scenario: User sets number of events they want to see, mainpage rerenders with that number of events
  Given the user now has the option to set number of events
  When the user sets number of events they want to see
  Then main page shoud re-render showing this number of events

 Scenario: User hasnt set a number of events so they should see all for that city
  Given the user now has the option to set number of events
  When the user doesnt set the number of events
  Then main page show all events for that city
  