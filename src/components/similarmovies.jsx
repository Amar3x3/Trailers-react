// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Cards from "./cards";


// const SimilarMovies = ({ genreId, apiKey }) => {
//   const [similarMovies, setSimilarMovies] = useState([]);

  
//   useEffect(() => {
//     const fetchSimilarMovies = async () => {
//       try {
//         const response = await axios.get(
//           `https://api.themoviedb.org/3/discover/movie?api_key=acf347697bcf4c77f3a955687b30d605&with_genres=${genreId}`
//         );
//         setSimilarMovies(response.data.results.slice(0, 6));
//       } catch (error) {
//         console.error("Error fetching similar movies:", error);
//       }
//     };

//     fetchSimilarMovies();
//   }, []);

//   return (
//     <div className="similar-movies">
//       <h1 className="genreTitle">Similar Movies</h1>
//      <div className="cards-list">
//         {similarMovies.map((movie) => (
//             <div className="smallcard">
//           <Cards
//             key={movie.id}
//             id={movie.id}
//             imgurl={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
//             title={movie.title}
//           />
//           </div>
//         ))}
//         </div>
     
//     </div>
//   );
// };
// export default SimilarMovies;
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cards from "./cards";

const SimilarMovies = ({ genreId, apiKey, updateTrailer }) => {
  const [similarMovies, setSimilarMovies] = useState([]);

  useEffect(() => {
    const fetchSimilarMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=acf347697bcf4c77f3a955687b30d605&with_genres=${genreId}`
        );
        setSimilarMovies(response.data.results.slice(0, 6));
      } catch (error) {
        console.error("Error fetching similar movies:", error);
      }
    };

    fetchSimilarMovies();
  }, [genreId, apiKey]);

  const handleCardClick = (movie) => {
    // Update the trailer URL when a card is clicked
    updateTrailer(movie);
  };

  return (
    <div className="similar-movies">
      <h1 className="genreTitle">Similar Movies</h1>
      <div className="cards-list">
        {similarMovies.map((movie) => (
          <div key={movie.id} className="smallcard" onClick={() => handleCardClick(movie)}>
            <Cards
              id={movie.id}
              imgurl={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              title={movie.title}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarMovies;
