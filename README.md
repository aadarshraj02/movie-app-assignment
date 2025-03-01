# Movie App

A movie discovery app where you can explore movies, mark them as favorites, and view movie details. This app is built using React, Axios for API requests, and Framer Motion for animations. The app fetches data from The Movie Database (TMDb) API.

## Features

- **Home Page**: Displays a grid of movies with details like title, rating, and release year.
- **Movie Details**: Clicking on a movie shows detailed information about that movie.
- **Search Page**: Allows searching for movies by title.
- **Favorites**: Users can mark movies as favorites, and these are saved in the browser's local storage. The favorites can be viewed on the favorites page.
- **Responsive Design**: The app is responsive, adapting to different screen sizes.
- **Animations**: Uses Framer Motion to add smooth animations and interactions like hover effects and transitions.

## Demo

You can try out the live version of the app 



## Technologies Used

- **React**: Frontend library for building user interfaces.
- **Axios**: Used to fetch data from TMDb API.
- **Framer Motion**: Used for animations.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **React Router**: Used for navigation between pages.
- **Local Storage**: Used for saving favorite movies.

## Setup Instructions

To get started with the project locally, follow the instructions below:

### 1. Clone the repository

```bash
git 
cd movie-app

npm install

VITE_TMDB_API_KEY=your-api-key-here

npm run dev

```


## Features Implemented

### Home Page:
- Displays a grid of **trending movies** using the TMDb API.
- Shows movie **title**, **rating**, and **poster**.
- Provides an "**Add to Favorites**" button that saves movies to **local storage**.

### Movie Card:
- Displays each movie in a **styled card** format.
- Shows **movie title**, **rating**, and **release date**.
- Allows users to **mark movies as favorites** with a heart button.
- The "**Add to Favorites**" button updates the UI and saves movies to **local storage**.

### Search Page:
- Allows users to **search for movies** by name.
- Displays search results in a card grid similar to the home page.

### Movie Details Page:
- Displays detailed information about a movie when clicked on a movie card.
- Shows information like **movie plot**, **release date**, and **genre**.

### Favorites Page:
- Displays a list of movies that have been **marked as favorites**.
- If no movies are marked as favorites, displays a message saying "**No favorite movies added yet**."
