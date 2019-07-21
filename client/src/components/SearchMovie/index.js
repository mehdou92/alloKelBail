import React, { useState } from 'react';
import {Link}  from 'react-router-dom';
import queryString from 'query-string';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

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
          query: query
        }
      }}>
        <IconButton color="primary" className={classes.iconButton} aria-label="Directions">
          <SearchIcon />
        </IconButton>
      </ Link>
    </Paper>
  );
}