import React, { useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import useFetchMovies from '../../hooks/useFetchMovies';


const useStyles = makeStyles(theme => ({
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }
}));

export default function MovieCard(props) {
  const classes = useStyles();

  const [idMovie, setIdMovie] = useState(props.match.params)

  const [{ data, isLoading, isError}, doFetch ] = useFetchMovies(`http://localhost:3000/movies/${idMovie.id}`);

  const displayDataMovie = (data) => {
    if(!data.hits){
      console.log(data);
      return <span>{data.Title} {data.Year} {data.Genre}</span>
    }
  }

  return (
    <Grid container component="main" className={classes.root}>
      {doFetch}
      {
        isLoading ? (
          <span> loading... </span>
        ) : (
          displayDataMovie(data)
        )
      }
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      </Grid>
    </Grid>
  );
}