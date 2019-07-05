import React from 'react';
import useFetchMovies from '../../hooks/useFetchMovies';
import Card from '../Card';

export default function ListMovies() {

    const [{ data, isLoading, isError }, doFetch] = useFetchMovies('http://localhost:3000/movies');

    const displayCardMovie = (data) => {
        if (!data.hits) {
            let tmpTab = [];
            data.forEach(element => {
                tmpTab.push(<Card title={element.Title} plot={element.Plot} poster={element.Poster} imdbId={element.imdbID} />)
            });
            return tmpTab;
        }
    }

    return (
        <>
            {doFetch}
            {
                isLoading ? (
                    <h1>LOADING</h1>
                ) : (
                        displayCardMovie(data)
                    )
            }
        </>
    );
}

