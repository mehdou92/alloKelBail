import React, { useContext } from 'react';
import { Link, BrowserRouter, Redirect } from 'react-router-dom';
import Router from '../Router';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '../IconButtons';
import { AuthContext } from '../Auth/AuthProvider';
import MovieCard from '../MovieCard';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
});

export default function ImgMediaCard(props) {
  const classes = useStyles();
  const { user } = useContext(AuthContext);

  const displayButton = () => {
    if (user) {
      const tmp = [<IconButton icon="favorite_border" label="I like it !" color="secondary" />, <IconButton icon="star_border" label="Movie seen" color="primary" />];
      return tmp;
    }
  }

  return (
    <Card className={classes.card}>
      {console.log(props.imdbId)}
      <CardActionArea>
        <CardMedia
          component="img"
          alt={props.title}
          height="140"
          image={props.poster}
          title={props.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" noWrap={true}>
            {props.plot}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <BrowserRouter>
          <Link to={`/movieCard/${props.imdbId}`} >
            <Button size="small" color="primary">
              See more
            </Button>
          </Link >
          <Router />
        </BrowserRouter>
        {displayButton()}
      </CardActions>
    </Card>
  );
}