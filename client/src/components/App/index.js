import React from 'react';
import Navbar from '../Navbar';
import AuthProvider from '../Auth/AuthProvider';
import Card from '../Card';
import useFetchMovies from '../../hooks/useFetchMovies';
import Footer from '../Footer';
import Router from '../Router';
import { BrowserRouter} from 'react-router-dom';

function App() {

  const [{ data, isLoading, isError }, doFetch] = useFetchMovies();

  const displayCardMovie = (data) => {
    if(!data.hits){
      console.log(data);
      let tmpTab = [];
      data.forEach(element => {
        tmpTab.push(<Card title={element.Title} plot={element.Plot} poster={element.Poster} imdbId={element.imdbID} />)
      });
      return tmpTab;
    }
  }

  return (
    <AuthProvider>
      <Navbar />
      {doFetch}
      {isLoading ? (
        <h1>LOADING</h1>
        ) : (
          displayCardMovie(data)
        )}
        <Footer />
    </AuthProvider>

  );
}

export default App;
