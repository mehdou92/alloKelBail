import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import SearchMovie from '../SearchMovie';
import Typography from '@material-ui/core/Typography';


import useFetchMovies from '../../hooks/useFetchMovies';
import { Container } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    padding: '20px 40px',
    display: 'flex',
    alignItems: 'center',
    width: 900,
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
});

export default function DisplaySearch(props) {
  const classes = useStyles();

  const [query, setQuery] = useState(null);
  const [hits, setHits] = useState(null);
  const [listMovies, setListMovies] = useState(null);

  const [errors, setErrors] = useState([]);

  const [{ data, isLoading, isError }, doFetch] = useFetchMovies(`http://localhost:3000/movies/search?q=${props.location.state.query}   `);


  const displayDataSearch = (data) => {
    console.log(query.query);

    console.log(data, 'result fetch');
    console.log(data.total);

  }

  const renderSearch = (list) => {

    let arrayRender = [];

    list.forEach(function (elem) {
      console.log(elem);
      const renderElem = (
        <Paper className={classes.root}>
          <Typography variant="h5" component="h3">
            {elem.Title}
          </Typography>
          <Typography component="p">
            {elem.Plot} {elem.Released} {elem.Year}
          </Typography>
          <Link to={`/movieCard/${elem.imdbID}`} >
            <Button size="small" color="primary">
              See more
            </Button>
          </Link >
        </Paper>
      );
      arrayRender.push(renderElem);
    })
    return arrayRender;
  }

  useEffect(() => {
    setQuery(props.location.state);
    setHits(data.total);
    setListMovies(data.hits);
  }, [query])

  return (
    <>

      {
        (query) &&
        <>
          {doFetch}

          {
            isLoading ? (
              <span> loading... </span>
            ) : (
                <>
                  {displayDataSearch(data)}
                  <Container maxWidth="xl">
                    <Typography variant="h3" gutterBottom>
                      Result of your search for : " {query.query} "
                    </Typography>
                    <Link to="/search" >
                      <Button variant="contained" color="primary" className={classes.button}>
                        NEW SEARCH
                      </Button>
                    </Link >
                    <Typography variant="subtitle1" gutterBottom>
                      We have found {data.total} matches.
                    </Typography>
                    {renderSearch(data.hits)}


                  </Container>
                </>
              )
          }
        </>
      }

    </>
  );
}