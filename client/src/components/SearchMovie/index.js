import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
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

export default function SearchBar(props) {
  const classes = useStyles();

  const [query, setQuery] = useState('');
  const [errors, setErrors] = useState([]);
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState('');

  const handleSubmit = () => {
    let err = [];
    console.log('handleSubmit');
    console.log('query ', query);

    if (!query) {
      err.push('empty query');
    }
    setErrors(err);
    if (err.length === 0) {
      console.log('no error form');

      setQuery(queryString.parse(props.location.search));
      console.log(query.q);
      console.log(props.location.search);

    } else {
      setErrors(err);
    }
  }


  return (
    <>
      <Paper className={classes.root}>
        <IconButton className={classes.iconButton} aria-label="Menu">
        </IconButton>
        <InputBase
          className={classes.input}
          placeholder="Search Movies"
          inputProps={{ 'aria-label': 'Search Movies' }}
          onChange={e => setQuery(e.target.value)}
          name="query"
          value={query}
        />

        <Divider className={classes.divider} />
        <Link to={{
          pathname: '/displaySearch',
          state: {
            query: query,
            genre: genre,
            rating: rating,
            year: year,
            title: title
          }
        }}>
          <IconButton color="primary" className={classes.iconButton} aria-label="Directions">
            <SearchIcon />
          </IconButton>
        </ Link>
      </Paper>
      <TextField
        id="outlined-with-placeholder"
        label="Movie genre"
        placeholder="Movie genre"
        className={classes.textField}
        margin="normal"
        variant="outlined"
        name="genre"
        value={genre}
        onChange={e => setGenre(e.target.value)}
      />
      <TextField
        id="outlined-with-placeholder"
        label="Movie year"
        placeholder="Movie year"
        className={classes.textField}
        margin="normal"
        variant="outlined"
        name="year"
        value={year}
        onChange={e => setYear(e.target.value)}
      />

      <TextField
        id="outlined-with-placeholder"
        label=" Movie rating superior to"
        placeholder="Movie rating superior to"
        className={classes.textField}
        margin="normal"
        variant="outlined"
        name="rating"
        value={rating}
        onChange={e => setRating(e.target.value)}
      />


      <TextField
        id="outlined-with-placeholder"
        label="Movie title"
        placeholder="Movie title"
        className={classes.textField}
        margin="normal"
        variant="outlined"
        name="title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
    </>
  );
}