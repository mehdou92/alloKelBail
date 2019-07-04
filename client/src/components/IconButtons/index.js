import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import StarBorder from '@material-ui/icons/StarBorder';
import Star from '@material-ui/icons/Star';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

const getIcon = (iconName) => {
  switch (iconName) {
    case 'favorite':
      return <Favorite />
    case 'favorite_border':
      return <FavoriteBorder />
    case 'star_border':
      return <StarBorder />
    case 'star':
      return <Star />
    default:
      console.error('Error getIcon from Icon Buttons');
  }
}

export default function IconButtons(props) {
  const classes = useStyles();

  return (
    <div>
      <IconButton color={props.color} className={classes.button} aria-label={props.label}>
        {getIcon(props.icon)}
      </IconButton>
    </div>
  );
}