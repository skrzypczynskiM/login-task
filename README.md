# Project Title

Simple login application with React 18, Redux and the Redux Toolkit that uses JWT authentication.

## Description

In this project, 3 simple pages were implemented:

-   a login page,
-   a page to display user data,
-   a page to update user data.

### Login Page:

-   The login page contains two form fields, that is, email and password. When the user presses the "submit" button, the application sends a request to an artificial server that has been created for this task. With a positive response, the user will receive a JWT. If incorrect data is entered, the fake backend will return an error, which will appear as notification in the top.
    ![Login page](/assets/login-page.PNG)

### User profile page:

-   Upon successful login, the user is transfered to a secure route where thetheir data is displayed. From this page, the user can go to the next page.
    ![Profile page](/assets/profile-page.PNG)

### Edit-Profile page:

-   A page with a form to update the user's data.
    Here you will find a form with 3 different types of inputs, of which there are 6 in total. After successfully updating the data, the user is automatically redirected to Profile Page.
    ![Edit-profile page](/assets/edit-profile.PNG)

### Backend simulation

-   A fetcher-wrapper and ApiService were implemented for the task. These are intended to accurately reflect the operation of the real backend. LocalStorage was used as the database. The token and user data are also stored in localStorage. This is due to the need to maintain the application state when refreshing the page.

#### Others

Each form is scrupulously validated using the YUP library, while the state of the forms is managed using the React-Hooks-Form library.

Application state management is done using the Redux-Tool-Kit library. This library allows the creation of well-scalable and readable code, which prompted me to use it. For the purposes of this small application, only one redux slice is implemented: usersSlice.

## Installation

Clone this repository and install dependencies inside project directory.

```
git clone https://github.com/skrzypczynskiM/login-task
cd login-task
npm install
```

## Usage

To run this project in development mode use:

```
npm run start
```

### Technological stack

-   React 18.2.0
-   TypeScript 4.9.3
-   Redux-Tool-Kit: 1.9.0
-   Tailwind
-   React-Hooks-Form 7.39.6
-   YUP 0.32.11
-   React-Router 6.4.3
