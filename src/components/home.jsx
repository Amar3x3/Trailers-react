import React from 'react';
import Genres from './genres';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import '../styles/main.css';
import Slider from "react-slick";
import Cards from "./cards";
import nxt from '../assests/nxtred.png';
import prev from '../assests/prevred.png';
const Home = ({ list }) => {



    const apiKey = "acf347697bcf4c77f3a955687b30d605";
    const baseUrl = "https://api.themoviedb.org/3";
    const imgPath = "https://image.tmdb.org/t/p/original";


    const settings = {
        dots: false,
        infinite: false,
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
                    slidesToScroll: 1.5
                }
            }
        ]
    };
    const trendingsettings = {
        dots: false,
        infinite: true,
        speed: 500,
        autoplay: true,
        slidesToShow: 4,
        slidesToScroll: 2,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1.8,
                    slidesToScroll: 1.5
                }
            }
        ]
    };
    const Bannersettings = {
        dots: false,
        infinite: false,
        speed: 800,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const apiPaths = {
        fetchAllCategories: `${baseUrl}/genre/movie/list?api_key=${apiKey}`,
        fetchMovies: (id) => `${baseUrl}/discover/movie?api_key=${apiKey}&with_genres=${id}`,
        fetchTrending: `${baseUrl}/trending/all/day?api_key=${apiKey}&language=en-US`,
        fetchYoutubeTraler: (searchQuery) => `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&key=AIzaSyCj6jfBamh3bvKee-Lg-nA1Du7B_K5uPmY`
    }

    const [genres, setGenres] = useState([]);
    const [trending, setTrending] = useState([]);


    useEffect(() => {






        const getGenres = async () => {
            await axios.get(`${baseUrl}/genre/movie/list?api_key=${apiKey}`)
                .then(res => setGenres(res.data.genres))
                .catch(error => console.log(error));
        }
        const getTrending = async () => {
            await axios.get(apiPaths.fetchTrending)
                .then(res => setTrending(res.data.results))
                .catch(error => console.log(error))
        }
        console.log(trending)

        getGenres();
        getTrending();

    }, [])



    return <>
        <h1>home</h1>
        <div className="mainBanner uni-up-margin">

            <div className="bigbanner">
                <Slider {...Bannersettings}>
                    {trending.map((movie) => (
                        console.log(movie),
                        <div className='banner-cont'>
                            <div className="overlay">
                                <div className="banner-info">
                                    <h1 className="banner-title">{movie.title}</h1>
                                    <p className="banner-text">{movie.overview}</p>
                                </div>
                            </div>
                            <Cards
                                key={movie.id}
                                id={movie.id}
                                imgurl={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                                title={movie.title}
                                bigBannerFlg={true}
                            />
                        </div>
                    ))}
                </Slider>
            </div>

            <div className="cards">
                {list && list.length > 0 && (
                    <div>
                        <h1 className='genreTitle'>My List</h1>
                        <Slider {...settings}>
                            {list.map((movie) => (
                                // console.log(movie),
                                <Cards
                                    key={movie.id}
                                    id={movie.id}
                                    imgurl={`https://image.tmdb.org/t/p/original${movie.img}`}
                                    title={movie.title}
                                />
                            ))}
                        </Slider>
                    </div>
                )}
            </div>

            <div className="cards">

                <div>
                    <h1 className='genreTitle'>Trending Now</h1>
                    <Slider {...trendingsettings}>
                        {trending.map((movie) => (
                            // console.log(movie),
                            <Cards
                                key={movie.id}
                                id={movie.id}
                                imgurl={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                                title={movie.title}
                            />
                        ))}
                    </Slider>
                </div>

            </div>




            {genres.map((genre) => (
                <Genres key={genre.id} genreName={genre.name} apikey={apiKey} movieUrl={apiPaths.fetchMovies(genre.id)} />

            ))}

        </div>




    </>
}
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
export default Home;