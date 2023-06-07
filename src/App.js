import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

const MoviesList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('https://api.tvmaze.com/search/shows?q=all')
      .then(response => response.json())
      .then(data => setMovies(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>Movies</h2>
      {movies.map(movie => (
        <div key={movie.show.id}>
          <h3>{movie.show.name}</h3>
          <p>{movie.show.summary}</p>
          <Link to={`/movies/${movie.show.id}`}>View Summary</Link>
        </div>
      ))}
    </div>
  );
};

const MovieSummary = ({ match }) => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const movieId = match.params.id;
    fetch(`https://api.tvmaze.com/shows/${movieId}`)
      .then(response => response.json())
      .then(data => setMovie(data))
      .catch(error => console.error(error));
  }, [match.params.id]);

  const handleBookTicket = () => {
    // Handle ticket booking logic here
    // You can open a form or perform any other action
    // For this example, let's simulate the form opening with the movie name pre-filled
    localStorage.setItem('movieName', movie.name);
    alert('Opening ticket booking form...');
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{movie.name}</h2>
      <p>{movie.summary}</p>
      <button onClick={handleBookTicket}>Book Ticket</button>
    </div>
  );
};

const TicketBookingForm = () => {
  const movieName = localStorage.getItem('movieName');

  return (
    <div>
      <h2>Book Ticket</h2>
      <p>Movie: {movieName}</p>
      {/* Form components and logic can be added here */}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MoviesList} />
        <Route path="/movies/:id" component={MovieSummary} />
        <Route path="/booking" component={TicketBookingForm} />
      </Switch>
    </Router>
  );
};

export default App;
