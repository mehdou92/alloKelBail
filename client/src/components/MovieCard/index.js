import React, { useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import useFetchMovies from '../../hooks/useFetchMovies';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '../IconButtons';
import Comments from '../comments';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
  title: {
    textAlign: 'center'
  },
  contentContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: '30px',
  },
  textContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginRight: '10%',
    width: '50%',
  },
  commentDisplay: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
}));

export default function MovieCard(props) {
  const classes = useStyles();

  const [idMovie, setIdMovie] = useState(props.match.params)

  const [{ data, isLoading, isError}, doFetch ] = useFetchMovies(`http://localhost:3000/movies/${idMovie.id}`);

  const displayDataMovie = (data) => {
    if(!data.hits){
      console.warn(data);
      return <>
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3" className={classes.title}>
          {data.Title}
        </Typography>
        <div className={classes.contentContainer}>
            <div className={classes.textContainer}>
              <div>
                <Typography component="p">
                  <b>Date of release : </b>{data.Released}
                </Typography>
                <Typography component="p">
                  <b>Genre : </b>{data.Genre}
                </Typography>
                <Typography component="p">
                  <b>Productions : </b>{data.Production}
                </Typography>
                <Typography component="p">
                  <b>IMDB Metascore : </b>{data.Metascore}/100
                </Typography>
                <Typography component="p">
                  <b>Actors : </b>{data.Actors}
                </Typography>
                <Typography component="p">
                  <b>Synopsis : </b>{data.Plot}
                </Typography>
              </div>
              <div className={classes.contentContainer}>
              <IconButton icon="favorite_border" label="I like it !" color="secondary" />
              <IconButton icon="star_border" label="Movie seen" color="primary" />
              </div>
            </div>
          <img alt="Poster" src={data.Poster} />
        </div> 
      </Paper>
      <Comments className={classes.commentDisplay} idMovie={idMovie} />
    </> 
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