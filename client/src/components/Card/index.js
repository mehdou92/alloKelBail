import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "../IconButtons";
import { AuthContext } from "../Auth/AuthProvider";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import "./index.scss";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  card: {
    maxWidth: 345
  }
}));

export default function ImgMediaCard(props) {
  const classes = useStyles();
  const { user } = useContext(AuthContext);

  const displayButton = () => {
    if (user) {
      const tmp = [
        <IconButton
          icon="favorite_border"
          label="I like it !"
          color="secondary"
        />,
        <IconButton icon="star_border" label="Movie seen" color="primary" />
      ];
      return tmp;
    }
  };

  const likeMovie = async () => {
    console.log("like movie");
    try {
      const response = await axios.get(
        `https://localhost:3000/neptune/insert-data-graph`
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  console.log("poster : ", props.poster);
  return (
    <Grid item xs={3}>
      <Paper className={classes.paper}>
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt={props.title}
              height="400"
              image={props.poster}
              title={props.title}
            />
            <span class="info-card">
              <p class="info-year">{props.year}</p>
              <p class="info-genre">{props.genre}</p>
              <p class="info-timer">{props.timer}</p>
              <p class="info-rate">{props.rate} / 10</p>
            </span>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {props.title}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                noWrap={true}
              >
                {props.plot}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Link to={`/movieCard/${props.imdbId}`}>
              <Button size="small" color="primary">
                See more
              </Button>
            </Link>
            <Button variant="outlined" color="secondary" onClick={() => likeMovie()}>
              I like it !
            </Button>
            {displayButton()}
          </CardActions>
        </Card>
      </Paper>
    </Grid>
  );
}
