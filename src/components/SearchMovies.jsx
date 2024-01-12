import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Genres from './genres';
import Cards from './cards';

const Search = () => {
  const apiKey = 'acf347697bcf4c77f3a955687b30d605';
  const baseUrl = 'https://api.themoviedb.org/3';
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  
  useEffect(() => {
    const getAllMovies = async () => {
      try {
        let allMovies = [];
        for (let page_no = 1; page_no < 21; page_no++) {
          let res = await axios.get(`${baseUrl}/discover/movie?api_key=${apiKey}&page=${page_no}`);
          allMovies = [...allMovies, ...res.data.results];
        }
        setMovies(allMovies);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    
    

   
    getAllMovies();
  }, []);
  useEffect(() => {
    console.log(movies);
  }, [movies]);
  
  useEffect(() => {
   
    const filtered = movies.filter(
      (movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredMovies(filtered);
  }, [searchTerm, genres, movies]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleGenreSelect = (selectedGenres) => {
    setGenres(selectedGenres);
  };

  return (
    <div>
      <h1>Search Page</h1>
      <div className="search-bar-cont">
      <input className='search-bar' type="text" placeholder="Search by title" value={searchTerm} onChange={handleSearch} />
      </div>
      

      <Genres genres={genres} onSelect={handleGenreSelect} />

      <div className='cards-list'>
        {filteredMovies.map((movie) => (
        <div className="smallcard">
          <Cards id={movie.id} genre={movie.genres} title={movie.title} imgurl={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}></Cards>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
