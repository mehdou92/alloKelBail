import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';

import useFetchMovies from '../../hooks/useFetchMovies';

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

export default function DisplaySearch (props) {
  const classes = useStyles();

  const [query, setQuery] = useState(null);
  const [errors, setErrors] = useState([]);

  const [{ data, isLoading, isError }, doFetch] = useFetchMovies(`http://localhost:3000/movies/search?q=${props.location.state.query}   `);


  const displayDataSearch = (data) => {
      console.log(query.query);
    console.log(data, 'result fetch');
  }
  
  useEffect( () => {
    setQuery(props.location.state)
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
                      displayDataSearch(data)
                  )
                }
                </>
            }
    
    </>
  );
}