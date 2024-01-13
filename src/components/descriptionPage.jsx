
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SimilarMovies from "./similarmovies";



const MovieDescription = ({ addtolist, list, setlist }) => {
  const { title, id, imgurl,genre } = useParams();
  const decodedImgUrl = decodeURIComponent(imgurl);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [movie, setMovie] = useState([]);
  const [img, setImg] = useState();
  const [tickflg, setTickflg] = useState();
  const [listText, setListText] = useState("Add to List");
  const trailerRef = useRef(null);
  
  const genreId = movie.genres && movie.genres.length > 0 ? movie.genres[0].id : null;
  
  const movielist = {
    id: id,
    img: decodedImgUrl,
    title: title
  };
  
  const handleAddToList = () => {

    
    if (!list.find((movie) => movie.id === id)) {
      addtolist(movielist);
      setTickflg(true);
      setListText("Added to List")
      

    } else {
      const updatedList = list.filter((movie) => movie.id !== id);
      setlist(updatedList);
      setListText("Add to List")
      setTickflg(false)

    }

  };



  useEffect(() => {
    
    console.log("effect is running");
    if (trailerRef.current) {
      trailerRef.current.play();
    }
    if (!list.find((movie) => movie.id === id)) {
      
      setTickflg(false);
      

    } else {
      setListText("Remove")
      setTickflg(true);
      
    }
    const fetchTrailer = async () => {
      try {

        const query = title + " trailer";

        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query} trailer&key=AIzaSyBXeT5NA4u6bWfvclu-guWgUSDHhx48jAM`
        );
        const videoId = response.data.items[0].id.videoId;
        setTrailerUrl(`https://www.youtube.com/embed/${videoId}`);
      } catch (error) {
        console.error("Error fetching trailer:", error);
      }
    };
    const fetchMovieDescription = async () => {

      try {

        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=acf347697bcf4c77f3a955687b30d605`
        );
        console.log(res.data);
        setMovie(res.data);
        console.log(movie.backdrop_path);
        setImg(movie.backdrop_path);

      } catch (error) {
        console.log("error while fetching movie from movieid" + error);
      }
    };


    fetchTrailer();
    fetchMovieDescription();
  }, []);

  return (
    <div className="mega-cont-desc uni-up-margin-desc">

      <iframe
        className="trailer-cont"
        title="Movie Trailer"
        width="560"
        height="315"
        src={trailerUrl}
        frameBorder="0"
        allowFullScreen
        allow="autoplay"
      ></iframe>


      <div className="cont-desc">
        <div className="title-n-ticks-cont">
            <h2 className="genreTitle big-title no-pd">{title}</h2>
            <div onClick={handleAddToList} className={`ticks ${tickflg ? 'clicked' : ''}`}>
        <div className="tick-1"></div>
        <div className="tick-2"></div>
        <p className="list-text-sm">{listText}</p>
      </div>
        </div>
       
        <p className="text dateNruntime-cont "><span className="release-date">Release Date: {movie.release_date}</span><span>Runtime: {movie.runtime}min</span></p>
        <h1 className="genreTitle no-pd">Description</h1>
        <p className="text">{movie.overview}</p>
        <h1 className="genreTitle no-pd">Audio Available</h1>
        {movie.spoken_languages && Array.isArray(movie.spoken_languages) && movie.spoken_languages.length > 0 ? (
          movie.spoken_languages.map((language, index) => (
            <p className="text audio-text" key={index}>{language.name}</p>
          ))
        ) : (
          <p>No audio available.</p>
        )}

      </div>

     


      
      

      <div className="sizebox"></div>
      


    </div>


  );
};

export default MovieDescription;
