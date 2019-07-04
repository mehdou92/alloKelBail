import React from 'react';
import Navbar from '../Navbar';
import AuthProvider from '../Auth/AuthProvider';
import Card from '../Card';
import useFetchMovies from '../../hooks/useFetchMovies';

function App() {

  const [{ data, isLoading, isError }, doFetch] = useFetchMovies();

  const displayCardMovie = (data) => {
    if(!data.hits){
      console.log(data);
      let tmpTab = [];
      data.forEach(element => {
        tmpTab.push(<Card title={element.Title} plot={element.Plot} poster={element.Poster} imdbId={element.imdbId} />)
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
    </AuthProvider>

  );
}

export default App;
