# Meet-App

A serverless, progressive web application built with React using test-driven development which uses the Google Calendar API to fetch upcoming events.

The serverless functions will enable fast and easy deployment, scalability and cost efficiency.

This app specifically will use AWS Lambda for authentication, authorisation, geolocation services and event search.

## Technologies:

UI: React, CSS

Unit and integration testing: Jest

Acceptance Testing: Cucumber

Serverless: AWS Lambda

APIs: Google calendar

App Monitoring: Atatus




## User Stories

1.  As a user
    <br>
    I should be able to filter events by city
    <br>
    So that I can see a list of events taking place in my city

2.  As a user
    <br>
    I should be able to show/hide event details
    <br>
    so that I can see more or less information about an event

3.  As a user
    <br>
    I should be able to specify the number of events I want to view
    <br>
    so that I can see more or fewer events in the events list at once

4.  As a user
    <br>
    I should be able to use the app when offline
    <br>
    so that I can see the events I viewed the last time I was online

5.  As a user
    <br>
    I should be able to add the app shortcut to my home screen
    <br>
    so that I can open the app faster

6.  As a user
    <br>
    I should be able to see a chart showing the upcoming events in each city
    <br>
    so that I know what events are organized in which city

## Scenarios

## Feature 1 - Filter Events by City

### Scenario 1

. Given user hasn’t searched for any city;
<br>
. When the user opens the app;
<br>
. Then the user should see a list of upcoming events for all cities

### Scenario 2

. Given the main page is open;
<br>
. When user starts typing in the city textbox;
<br>
. Then the user should receive a list of city suggestions that match what they’ve typed.

### Scenario 3

. Given user was typing “Berlin” in the city textbox AND the list of suggested cities is showing;
<br>
. When the user selects a city (e.g., “Berlin, Germany”) from the list;
<br>
. Then their city should be changed to that city (i.e., “Berlin, Germany”) AND the user should receive a list of upcoming events in that city.

## Feature 2 - Show/Hide Event Details

### Scenario 1

. Given the user has searched for a chosen a city from the list
<br>
. When the user clicks on show details button
<br>
. Then a new component should render displaying more information on that event

### Scenario 2

. Given the user has clicked show more details and the event component is open
<br>
. When the user clicks on hide details button
<br>
. Then the mainpage should re-render

## Feature 3 - Specify Number of Events

### Scenario 1

. Given the user has searched for a chosen a city on the mainpage
<br>
. When the user clicks on that city
<br>
. Then a new option should appear allowing them to specify the number of events they want to see

### Scenario 2

. Given the user now has the option to set number of events
<br>
. When the user sets number of events they want to see
<br>
. Then main page shoud re-render showing this number of events

### Scenario 3

. Given the user now has the option to set number of events
<br>
. When the user doesnt set the number of events
<br>
. Then main page show all events for that city

## Feature 4 - Use the App When Offline

### Scenario 1

. Given the user has disconnected from their wifi or network
<br>
. When the user opens the application
<br>
. Then application should show cached data

### Scenario 2

. Given the user has disconnected from their wifi or network
<br>
. When the user tries to search for new city
<br>
. Then application should return an error

## Feature 5 - Add an App Shortcut to the Home Screen

### Scenario 1

. Given the user is on the main page
<br>
. When the user clicks on an option to add to homescreen
<br>
. Then application should create an icon and place onto homescreen

## Feature 6 - Display Charts Visualizing Event Details

### Scenario 1

. Given the user has chosen a city
<br>
. When the main page re-renders with that cities events
<br>
. Then it should display the data for the upcoming events in a chart
