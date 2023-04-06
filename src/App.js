import { useEffect, useState } from 'react';
import './App.css';
// import api from './api/axios.config';
import axios from 'axios';
import Layout from './components/Layout';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import Trailer from './components/trailer/Trailer';




function App() {

  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_API_URL);
      console.log(response);
      const { data } = response;
      setMovies([...data])
      console.log(movies);
    } catch (err) {
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
          {/* <Route path="/trailer/:ytTrailerId" element={<Trailer/>}></Route> */}
          <Route path="/Trailer" element={<Trailer/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
