import { useEffect, useState } from 'react';
import './App.css';
// import api from './api/axios.config';
import axios from 'axios';
import Layout from './components/Layout';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import Trailer from './components/Trailer/Trailer';
import Review from './components/Review/Review';




function App() {

  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);

  const getMovies = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_API_URL + '/movies');
      // console.log(response);
      const { data } = response;
      setMovies([...data])
      console.log(movies);
    } catch (err) {
      console.log(err);
    }
  }

  const getMovieData = async(id) => {
    try{
      const response = await axios.get(process.env.REACT_APP_API_URL + '/movies/' + id );
      const { data } = response;
      setMovie(data);
      console.log(movie);
      const reviewsArray = [...movie.reviewIds];
      setReviews([...reviewsArray]);
    }catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    getMovies()
  }, []);


  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home movies={movies} />} /> 
          <Route path="/trailer/:id" element={<Trailer/>}></Route>
          <Route path="/reviews/:id" element={<Review getMovieData={getMovieData} movie={movie} reviews={reviews} setReviews={setReviews} />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
