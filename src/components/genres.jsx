import React, { useEffect } from "react";
import { useState } from "react";
import '../styles/main.css';
import Slider from "react-slick";
import Cards from "./cards";
import axios from "axios";
import '../styles/main.css';
import nxt from '../assests/nxtred.png';
import prev from '../assests/prevred.png';

const Genres = ({ genreName, apikey, movieUrl}) => {
    const [movie, setMovie] = useState([]);
    

    

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 2,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1.8,
                    slidesToScroll: 1
                }
            }
        ]
    };


    useEffect(() => {
        
        const getMovies = async () => {
            // console.log(movieUrl);
            await axios.get(movieUrl)
                .then((res) => {
                    setMovie(res.data.results)
                    // console.log(res.data.results);

                })
                .catch(error => console.log(error));

        }

        getMovies();


    }, [])




    return (
        <div className="genre-slider">
            <div className="genreTitle">  <h1 >{genreName}</h1> </div>
            <div className="cards">

            

                <Slider {...settings}>
                    {movie.map((movie) => (
                        <Cards id={movie.id}  imgurl={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} title={movie.title} />
                    ))}
                </Slider>


            </div>
        </div>
    );
};

const NextArrow = (props) => {
    const { onClick } = props;
    return <>
        <div className="nxt" onClick={onClick}>
            <img src={nxt} alt="" />
        </div>
    </>
}
const PrevArrow = (props) => {
    const { onClick } = props;
    return <>
        <div className=" prev" onClick={onClick}>
            <img src={prev} alt="" />
        </div>
    </>
}

export default Genres;