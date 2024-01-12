import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes, useLocation} from 'react-router-dom';
import { useState, useEffect} from 'react';
import Home from './components/home';
import SearchMovies from './components/SearchMovies';
import MovieDescription from './components/descriptionPage';
import Navbar from './components/navbar';


function App() {
  const [myList, setMyList] = useState([]);

  const addToMyList = (movie) => {
    console.log("Adding to list:", movie);
    setMyList((prevList) => [...prevList, movie]);
  }

  const ScrollToTop = () => {
    const location = useLocation();
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [location]);
  
    return null;
  };
  
  return (
    <>
  
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Home list={myList}/>}></Route>
           <Route path='/search' element={<SearchMovies/>}></Route>
           
           <Route path='/movieDesc/:title/:id/:imgurl' element={<MovieDescription setlist={setMyList} addtolist={addToMyList} list={myList} />}></Route>
        </Routes>
        <ScrollToTop/>
      </BrowserRouter>
      
    
    </>
  );
}

export default App;
