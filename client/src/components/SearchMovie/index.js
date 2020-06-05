import React, { useState , useEffect} from 'react';
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
          pathname: '/search-result',
          state: {
            query: query
          }
        }}>
          <IconButton color="primary" className={classes.iconButton} aria-label="Directions">
            <SearchIcon />
          </IconButton>
        </ Link>
      </Paper>
    </>
  );
}