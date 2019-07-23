import React from 'react';
import useFetchMovies from '../../hooks/useFetchMovies';
import Card from '../Card';
import Grid from "@material-ui/core/Grid/Grid";
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography/Typography";


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function ListMovies() {

    const [{ data, isLoading, isError }, doFetch] = useFetchMovies('http://localhost:3000/movies');
    const classes = useStyles();

    const displayCardMovie = (data) => {
        if (!data.hits) {
            let tmpTab = [];
            data.forEach(element => {
                tmpTab.push(<Card title={element.Title} plot={element.Plot} poster={element.Poster} imdbId={element.imdbID} />)
            });
            return tmpTab;
        }
    }

    return (
        <>
            {doFetch}
            {
                isLoading ? (
                    <h1>LOADING</h1>
                ) : (
                    <div className={classes.root}>
                        <Typography align={"center"} variant="h3" className={classes.title}>
                            Movie List
                        </Typography>
                        <Grid container spacing={3}>
                            {displayCardMovie(data)}
                        </Grid>
                    </div>
                    )
            }
        </>
    );
}

