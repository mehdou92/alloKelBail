import React, { useContext } from 'react';
import useFetchMovies from '../../hooks/useFetchMovies';
import useFetchComments from '../../hooks/useFetchComments';
import Card from '../Card';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import useForm from '../../hooks/useForm';
import validate from '../../rules/LoginFormValidationRules';
import { AuthContext } from '../Auth/AuthProvider';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
    comment: {
        textAlign: 'center',
        margin: '10px',
        padding: '5px'
    },
    form: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    commentUnit: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'column',
        marginBottom: '20px',
        width: '100%'
      },
}));

export default function Comments(props) {

    const { values, handleChange, handleSubmit, errors } = useForm(handleComment);

    const classes = useStyles();

    const { user } = useContext(AuthContext);

    const [{ data, isLoading, isError}, doFetch ] = useFetchMovies(`http://localhost:3000/movies/${props.idMovie.id}/comments`);

    const displayComments = (data) => {
        if (data.hits || data) {
            // console.warn('data : ', data.hits.length);
            if(data.hits && !data.hits.length > 0) {
                return [];
            } else if(data.length > 0 && data[0]._id) {
                let tmpTab = [];
                data.forEach(element => {
                    tmpTab.push(<Paper className={classes.comment}><Typography component="h1" variant="h5">{element.Text}</Typography></Paper>)
                });
                return tmpTab;
            }
        }
    };

    function handleComment(){
        fetch(`http://localhost:3000/movies/${props.idMovie.id}/comments`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'Text': values.comment,
                'MovieId': props.idMovie.id
            })
        }).then((result) => {
            console.warn('result : ', result);
            values.comment = '';
        });
    }
    return (
        <>
        <div className={classes.commentUnit}>
        { user ? 
            <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <TextField
                id="standard-name"
                label="Votre commentaire"
                name="comment"
                className={classes.textField}
                value={values.comment}
                onChange={handleChange}
                margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" className={classes.button}>
                Envoyer
            </Button>
            </form>
            :
            null
        }
            {doFetch}
            {
                isLoading ? (
                    <p>Pas de commentaires actuellement</p>
                ) : (
                        displayComments(data)
                    )
            }
            {}
        </div>
        </>
    );
}

